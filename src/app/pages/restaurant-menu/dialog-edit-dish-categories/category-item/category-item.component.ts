import { Component, Input } from '@angular/core';
import { DishCategory } from '../../../../models/dish-category.model';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatRipple } from '@angular/material/core';
import { DishCategoryService } from '../../../../services/dish-category/dish-category.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RefreshService } from '../../../../services/dish-category/refresh-dish-category.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatInputModule,
    CdkDrag,
    CdkDragHandle,
    MatRipple,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss',
})
export class CategoryItemComponent {
  editMode = false;
  @Input() category!: DishCategory;
  categoryNameControl = new FormControl('', Validators.required);

  constructor(
    private dishCategoryService: DishCategoryService,
    private toastr: ToastrService,
    private refreshService: RefreshService,
    private dialog: MatDialog
  ) {}

  editName() {
    this.editMode = !this.editMode;
  }

  saveName() {
    if (
      this.categoryNameControl.invalid ||
      this.categoryNameControl.value === null
    ) {
      this.toastr.error('Nazwa kategorii nie może być pusta');
      return;
    }
    this.dishCategoryService
      .editNameOfDishCategory(this.category.id, this.categoryNameControl.value)
      .subscribe({
        next: (updatedCategory: DishCategory) => {
          this.category = updatedCategory;
          this.editMode = false;
          this.refreshService.refresh();
        },
        error: (error) => {
          this.toastr.error('Błąd podczas edycji nazwy kategorii');
        },
      });
  }

  removeDishCategory() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Potwierdzenie usunięcia',
        message: 'Czy na pewno chcesz usunąć ten element? Nieodwracalnie utracisz wszystkie dania przypisane do tej kategorii?',
        element: this.category,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        console.log('Usuwanie kategorii');
      }else{
        console.log('Anulowano usuwanie kategorii');
        return;
      }
    });


    // this.dishCategoryService.removeDishCategory(this.category.id).subscribe({
    //   next: () => {
    //     this.refreshService.refresh();
    //   },
    //   error: (error) => {
    //     this.toastr.error('Błąd podczas usuwania kategorii');
    //   },
    // });
  }
}
