import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Dish } from '../../../models/dish.model';
import { DishWithCategoryName } from '../../../models/dish-with-category-name.model';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { DishCategoryService } from '../../../services/dish-category/dish-category.service';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { DishCategory } from '../../../models/dish-category.model';

@Component({
  selector: 'app-dialog-edit-dish',
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
    MatSelectModule
  ],
  templateUrl: './dialog-edit-dish.component.html',
  styleUrl: './dialog-edit-dish.component.scss'
})
export class DialogEditDishComponent {
  editDishFormGroup: FormGroup= new FormGroup({
    id: new FormControl(this.data.id),
    name: new FormControl(this.data.name),
    price: new FormControl(this.data.price),
    category: new FormControl(this.data.dishCategoryName),
    description: new FormControl(this.data.description),
  });;
  categories!: DishCategory[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DishWithCategoryName,
    private refreshService: RefreshService,
    private dishCategoryService: DishCategoryService,
    private toastr: ToastrService,
  ) {console.log(data);}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.dishCategoryService.getAllDishCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  editDish() {
    throw new Error('Method not implemented.');
    }
}
