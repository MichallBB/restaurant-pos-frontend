import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, debounceTime, switchMap } from 'rxjs';
import { RestaurantTable } from '../../../models/restaurant-table.model';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { RestaurantTableService } from '../../../services/restaurant-table/restaurant-table.service';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-dialog-edit-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-edit-table.component.html',
  styleUrl: './dialog-edit-table.component.scss',
})
export class DialogEditTableComponent {
  editTableFormGroup = new FormGroup({
    tableNumber: new FormControl(this.data.table.tableNumber),
  });
  private tableNumberSubject = new Subject<string>();
  private subscription!: Subscription;
  isAvailable: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {table: RestaurantTable},
    private refreshService: RefreshService,
    private tableService: RestaurantTableService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.tableNumberSubject
      .pipe(
        debounceTime(200),
        switchMap((tableNumber) =>
          this.tableService.checkAvailability(tableNumber),
        ),
      )
      .subscribe({
        next: (response) => {
          if (response.available === false) {
            this.editTableFormGroup
              .get('tableNumber')
              ?.setErrors({ incorrect: true });
            this.isAvailable = false;
          } else {
            this.isAvailable = true;
          }
        },
        error: (error) => {
          this.toastr.error(
            'Błąd podczas sprawdzania dostępności numeru stolika',
          );
        },
      });

    this.editTableFormGroup
      .get('tableNumber')
      ?.valueChanges.subscribe((value) => {
        this.tableNumberSubject.next(value!);
      });
  }

  editTable(): void {
    if (!this.editTableFormGroup.valid) {
      this.toastr.error('Numer stolika jest wymagany');
      return;
    }
    if (
      this.editTableFormGroup.value.tableNumber &&
      this.editTableFormGroup.value.tableNumber !== ''
    ) {
      const tableNumber: string = this.editTableFormGroup.value.tableNumber;

      this.tableService.editTable(this.data.table.id, tableNumber).subscribe({
        next: () => {
          this.refreshService.refresh();
          this.toastr.success('Zmieniono numer stolika');
        },
        error: (error) => {
          if (error.status === 414) {
            this.toastr.error('Numer stolika jest już zajęty');
            return;
          }
        },
      });
    } else {
      this.toastr.error('Numer stolika jest wymagany');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
