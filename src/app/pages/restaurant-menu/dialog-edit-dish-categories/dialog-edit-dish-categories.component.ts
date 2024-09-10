import { Component } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DishCategory } from '../../../models/dish-category.model';
import { DishCategoryService } from '../../../services/dish-category/dish-category.service';
import { MatIcon } from '@angular/material/icon';
import {
  MatProgressSpinner,
  MatSpinner,
} from '@angular/material/progress-spinner';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  CdkDragPlaceholder,
  CdkDragHandle,
} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { CategoryItemComponent } from './category-item/category-item.component';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { Subscription } from 'rxjs';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-edit-dish-categories',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIcon,
    MatProgressSpinner,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CategoryItemComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-edit-dish-categories.component.html',
  styleUrl: './dialog-edit-dish-categories.component.scss',
})
export class DialogEditDishCategoriesComponent {
  dishCategories!: DishCategory[];
  dataLoaded = false;
  errorHappened = false;
  editMode = false;
  newCategoryForm!: FormGroup;
  private refreshSubscription!: Subscription;

  constructor(
    private dishCategoryService: DishCategoryService,
    private toastr: ToastrService,
    private refreshService: RefreshService,
  ) {}

  ngOnInit() {
    this.getAllDishCategories();

    this.newCategoryForm = new FormGroup({
      newCategoryName: new FormControl(''),
    });

    this.refreshSubscription = this.refreshService.refresh$.subscribe(() => {
      this.getAllDishCategories();
    });
  }

  editName() {
    this.editMode = !this.editMode;
  }

  drop(event: CdkDragDrop<DishCategory[]>) {
    if (event.currentIndex === event.previousIndex) {
      return;
    }
    moveItemInArray(
      this.dishCategories,
      event.previousIndex,
      event.currentIndex,
    );
    this.dataLoaded = false;
    this.dishCategoryService
      .moveDishCategory(event.item.data.id, event.currentIndex)
      .subscribe({
        next: (updatedCategory: DishCategory) => {
          this.dataLoaded = true;
          this.getAllDishCategories();
          this.refreshService.refresh();
        },
        error: (error) => {
          this.dataLoaded = true;
          this.errorHappened = true;
          this.toastr.error('Błąd podczas przenoszenia kategorii');
          this.getAllDishCategories();
        },
      });
  }

  getAllDishCategories() {
    this.dataLoaded = false;
    this.dishCategoryService.getAllDishCategories().subscribe({
      next: (categories: DishCategory[]) => {
        this.dishCategories = categories;
        this.dataLoaded = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addNewCategory() {
    const newCategoryName = this.newCategoryForm.get('newCategoryName')?.value;
    this.dishCategoryService.addDishCategory(newCategoryName).subscribe({
      next: (newCategory: DishCategory) => {
        this.getAllDishCategories();
        this.newCategoryForm.reset();
      },
      error: (error) => {
        if (error.status === 415) {
          this.toastr.error('Błąd podczas dodawania kategorii, nazwa kategorii nie może być pusta');
          return;
        }
        this.toastr.error('Błąd podczas dodawania kategorii');
      },
    });
  }
}
