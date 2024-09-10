import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DishCategoryService } from '../../../services/dish-category/dish-category.service';
import { DishCategory } from '../../../models/dish-category.model';
import { DishWithCategoryId } from '../../../models/dish-with-category-id.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';

@Component({
  selector: 'app-dialog-add-dish',
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
  templateUrl: './dialog-add-dish.component.html',
  styleUrl: './dialog-add-dish.component.scss',
})
export class DialogAddDishComponent {
  categories!: DishCategory[];
  newDishFormGroup = new FormGroup({
    dishName: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    categoryControl: new FormControl(-1, [Validators.required]),
    descriptionControl: new FormControl(''),
  });

  constructor(
    private refreshService: RefreshService,
    private dishCategoryService: DishCategoryService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  addNewDish(): void {
    console.log(this.newDishFormGroup.value);
    if (!this.newDishFormGroup.valid) {
      return;
    }

    const dish: DishWithCategoryId = {
      name: this.newDishFormGroup.value.dishName ?? '',
      price: this.newDishFormGroup.value.price ?? 0,
      description: this.newDishFormGroup.value.descriptionControl ?? '',
      dishCategoryId: this.newDishFormGroup.value.categoryControl ?? -1,
    };

    this.dishCategoryService.addDishToCategory(dish).subscribe({
      next: () => {
        this.refreshService.refresh();
        this.toastr.success('Dodano nowe danie');
      },
      error: (error) => {
        this.toastr.error('Błąd podczas dodawania dania');
      },
    });
  }

  getCategories(): void {
    this.dishCategoryService.getAllDishCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
