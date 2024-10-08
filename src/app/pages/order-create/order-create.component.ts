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
import {MatTooltipModule} from '@angular/material/tooltip';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIcon,
    MatDividerModule,
    MatListModule,
    CartComponent,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss',
})
export class OrderCreateComponent {
  categoryWithDishes!: DishCategory[];
  dishes!: Dish[];
  selectedCategory!: DishCategory;

  constructor(
    private toastr: ToastrService,
    private dishCategoryService: DishCategoryService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.getAllDishCategories();
  }

  switchSelectedCategory(category: DishCategory) {
    this.dishes = category.dishes;
    this.selectedCategory = category;
  }

  addToCart(dish: Dish) {
    this.cartService.addItem(dish);
  }

  getAllDishCategories() {
    this.dishCategoryService.getAllEnabledDishCategories().subscribe({
      next: (categories: DishCategory[]) => {
        this.categoryWithDishes = categories;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
