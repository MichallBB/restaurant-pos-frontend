import { Component } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DishCategory } from '../../../models/dish-category.model';
import { DishCategoryService } from '../../../services/dish-category/dish-category.service';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragPlaceholder, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { CategoryItemComponent } from "./category-item/category-item.component";

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
    CategoryItemComponent
],
  templateUrl: './dialog-edit-dish-categories.component.html',
  styleUrl: './dialog-edit-dish-categories.component.scss',
})
export class DialogEditDishCategoriesComponent {
  dishCategories!: DishCategory[];
  dataLoaded = false;
  errorHappened = false;
  editMode = false;

  constructor(private dishCategoryService: DishCategoryService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllDishCategories();
  }

  editName(){
    this.editMode = !this.editMode;
  }

  drop(event: CdkDragDrop<DishCategory[]>) {
    if(event.currentIndex === event.previousIndex){
      return;
    }
    moveItemInArray(this.dishCategories, event.previousIndex, event.currentIndex);
    this.dataLoaded = false;
    this.dishCategoryService.moveDishCategory(event.item.data.id, event.currentIndex).subscribe({
      next: (updatedCategory: DishCategory) => {
        this.dataLoaded = true;
        this.getAllDishCategories();
      },
      error: (error) => {
        this.dataLoaded = true;
        this.errorHappened = true;
        this.toastr.error('Błąd podczas przenoszenia kategorii');
        this.getAllDishCategories();
      }
    });
    
  }

  getAllDishCategories(){
    this.dishCategoryService.getAllDishCategories().subscribe({
      next: (categories: DishCategory[]) => {
        this.dishCategories = categories;
        this.dataLoaded = true;
        console.log(categories);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}
