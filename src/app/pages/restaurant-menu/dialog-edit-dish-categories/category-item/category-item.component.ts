import { Component, Input } from '@angular/core';
import { DishCategory } from '../../../../models/dish-category.model';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatRipple } from '@angular/material/core';
import { DishCategoryService } from '../../../../services/dish-category/dish-category.service';
import { ToastrService } from 'ngx-toastr';
import { Form, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RefreshService } from '../../../../services/dish-category/refresh-dish-category.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'; 

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
  categoryNameControl!: FormControl;

  constructor(
    private dishCategoryService: DishCategoryService,
    private toastr: ToastrService,
    private refreshService: RefreshService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.categoryNameControl = new FormControl(this.category.name, [
      Validators.required,
    ]);
  }

  toggleEditMode() {
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
        element: this.category,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeCategory();
      } else {
        return;
      }
    });
  }

  removeCategory() {
    this.dishCategoryService.removeDishCategory(this.category.id).subscribe({
      next: () => {
        this.refreshService.refresh();
      },
      error: (error) => {
        this.toastr.error('Błąd podczas usuwania kategorii');
      },
    });
  }
}
