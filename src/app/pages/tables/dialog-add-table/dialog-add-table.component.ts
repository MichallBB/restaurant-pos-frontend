import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { RestaurantTableService } from '../../../services/restaurant-table/restaurant-table.service';
import { TablesComponent } from '../tables.component';
import { RestaurantTable } from '../../../models/restaurant-table.model';
import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-dialog-add-table',
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
  templateUrl: './dialog-add-table.component.html',
  styleUrl: './dialog-add-table.component.scss',
})
export class DialogAddTableComponent {
  newTableFormGroup = new FormGroup({
    tableNumber: new FormControl(''),
  });
  private tableNumberSubject = new Subject<string>();
  private subscription!: Subscription;
  isAvailable: boolean = false;

  constructor(
    private refreshService: RefreshService,
    private tableService: RestaurantTableService,
    private toastr: ToastrService,
  ) {}

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
            this.newTableFormGroup
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

    this.newTableFormGroup
      .get('tableNumber')
      ?.valueChanges.subscribe((value) => {
        this.tableNumberSubject.next(value!);
      });
  }

  addNewTable(): void {
    if (!this.newTableFormGroup.valid) {
      this.toastr.error('Numer stolika jest wymagany');
      return;
    }
    if (
      this.newTableFormGroup.value.tableNumber &&
      this.newTableFormGroup.value.tableNumber !== ''
    ) {
      const tableNumber: string = this.newTableFormGroup.value.tableNumber;
      let table: RestaurantTable = {
        id: 0,
        tableNumber: tableNumber,
        isOccupied: false,
        isReserved: false,
        reserrvationTime: null,
      };
      this.tableService.createTable(table).subscribe({
        next: () => {
          this.refreshService.refresh();
          this.toastr.success('Stolik dodany');
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
