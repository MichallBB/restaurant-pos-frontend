import { Component, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmOrderCartDialogComponent } from './confirm-order-cart-dialog/confirm-order-cart-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { RestaurantTable } from '../../../models/restaurant-table.model';
import { RestaurantTableService } from '../../../services/restaurant-table/restaurant-table.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  OrderRequest,
  OrdersService,
} from '../../../services/orders/orders.service';
import { CartItem, CartService } from '../../../services/cart/cart.service';
import { CurrentUserService } from '../../../auth/current-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DishWithCategoryName } from '../../../models/dish-with-category-name.model';
import { DishInOrder } from '../../../models/dish-in-order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  sumOfCartItems = 0;
  quantityOfItems = 0;

  tables: RestaurantTable[] = [];
  tableSelected!: RestaurantTable;

  constructor(
    private dialog: MatDialog,
    private restaurantTableService: RestaurantTableService,
    private ordersService: OrdersService,
    private cartService: CartService,
    private userService: CurrentUserService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.restaurantTableService.getAllTables().subscribe((tables) => {
      this.tables = tables;
    });
    // Subscribe to cartItems and sumOfCartItems
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.quantityOfItems = items.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
    });

    this.cartService.sumOfCartItems$.subscribe((sum) => {
      this.sumOfCartItems = sum;
      this.quantityOfItems = this.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
    });
  }

  addTheSameItem(cartItem: Dish) {
    this.cartService.addItem(cartItem);
  }

  removeItem(cartItem: Dish) {
    this.cartService.deleteOneDish(cartItem);
  }

  openConfirmOrderDialog() {
    const dialogRef: MatDialogRef<ConfirmOrderCartDialogComponent, boolean> =
      this.dialog.open(ConfirmOrderCartDialogComponent, {
        data: {
          cartItems: this.cartItems,
          sumOfCartItems: this.sumOfCartItems,
          selectedTable: this.tableSelected.tableNumber,
        },
        width: '350px',
        height: '400px',
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let orderRequest: OrderRequest = this.createOrderObject();

        this.ordersService.createOrder(orderRequest).subscribe({
          next: (order) => {
            this.toastr.success('Order created successfully');
            console.log(orderRequest);
            this.cartService.cartItems = [];
            setTimeout(() => {
              this.router.navigate(['/zamowienia']);
            }, 1000);
          },
          error: (error) => {
            this.toastr.error('Error while creating order');
          },
        });
      }
    });
  }

  createOrderObject(): OrderRequest {
    let orderRequest: OrderRequest = {} as OrderRequest;
    orderRequest.id = -1;
    orderRequest.table = this.tableSelected;
    if (this.userService.currentUser) {
      orderRequest.waiterId = this.userService.currentUser.id;
    }
    orderRequest.dishes = [];

    this.cartItems.forEach((item) => {
      let arrayOfDishes: Dish[] = Array(item.quantity).fill(item.dish);

      let arrayOfDishesInOrder: DishInOrder[] = arrayOfDishes.map((dish) => {
        return {
          id: -1,
          served: false,
          cooked: false,
          dish: dish,
        };
      });
      orderRequest.dishes = [... orderRequest.dishes, ...arrayOfDishesInOrder];
    });

    orderRequest.price = this.sumOfCartItems;
    orderRequest.quantity = 1;
    orderRequest.specialRequest = '';
    orderRequest.orderStartTime = new Date();
    orderRequest.orderEndTime = new Date(Date.now() + 1000 * 60 * 60 * 48);
    return orderRequest;
  }
}
