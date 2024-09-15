import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DishCategory } from '../../models/dish-category.model';
import { ToastrService } from 'ngx-toastr';
import { DishCategoryService } from '../../services/dish-category/dish-category.service';
import { MatButtonModule } from '@angular/material/button';
import { Dish } from '../../models/dish.model';
import { MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIcon,
    MatDividerModule,
    MatListModule,
    CartComponent
  ],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss',
})
export class OrderCreateComponent {
  categoryWithDishes!: DishCategory[];
  dishes!: Dish[];
  cartItems: Dish[] = [];
  sumOfCartItems = 0;
  selectedCategory!: DishCategory;

  constructor(
    private toastr: ToastrService,
    private dishCategoryService: DishCategoryService,
  ) {}

  ngOnInit() {
    this.getAllDishCategories();
  }

  switchSelectedCategory(category: DishCategory) {
    console.log('Selected category:', category);
    this.dishes = category.dishes;
    this.selectedCategory = category;
  }

  addToCart(dish: Dish) {
    this.cartItems.push(dish);
    this.sumOfCartItems += dish.price;
  }

  getAllDishCategories() {
    this.dishCategoryService.getAllDishCategories().subscribe({
      next: (categories: DishCategory[]) => {
        this.categoryWithDishes = categories;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
