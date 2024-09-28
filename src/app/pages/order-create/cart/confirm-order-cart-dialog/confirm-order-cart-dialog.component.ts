import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Dish } from '../../../../models/dish.model';
import { twoDecimalPipe } from '../../../../pipes/two-deciomal.pipe';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../../../../services/cart/cart.service';

@Component({
  selector: 'app-confirm-order-cart-dialog',
  standalone: true,
  imports: [
    twoDecimalPipe,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './confirm-order-cart-dialog.component.html',
  styleUrl: './confirm-order-cart-dialog.component.scss',
})
export class ConfirmOrderCartDialogComponent {
  cartItems: CartItem[] = [];
  sumOfCartItems = 0;
  selectedTable!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cartItems: CartItem[], sumOfCartItems: number, selectedTable: string },
    private dialogRef: MatDialogRef<ConfirmOrderCartDialogComponent, boolean>,
  ) {}

  ngOnInit(): void {
    this.cartItems = this.data.cartItems;
    this.sumOfCartItems = this.data.sumOfCartItems;
    this.selectedTable = this.data.selectedTable;
  }
}
