import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Dish } from '../../../../models/dish.model';
import { MatButtonModule } from '@angular/material/button';
import { CartItem, CartService } from '../../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-order-cart-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIcon,
  ],
  templateUrl: './confirm-order-cart-dialog.component.html',
  styleUrl: './confirm-order-cart-dialog.component.scss',
})
export class ConfirmOrderCartDialogComponent {
  cartItems: CartItem[] = [];
  sumOfCartItems = 0;
  selectedTable!: string;
  quantityOfItems = 0;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cartItems: CartItem[];
      sumOfCartItems: number;
      selectedTable: string;
    },
    private dialogRef: MatDialogRef<ConfirmOrderCartDialogComponent, boolean>,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cartItems = this.data.cartItems;
    this.sumOfCartItems = this.data.sumOfCartItems;
    this.selectedTable = this.data.selectedTable;

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

  removeItem(cartItem: Dish) {
    this.cartService.deleteOneDish(cartItem);
  }

  addTheSameItem(cartItem: Dish) {
    this.cartService.addItem(cartItem);
  }
}
