import { Injectable } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  quantity: number;
  dish: Dish;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private sumOfCartItemsSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  sumOfCartItems$ = this.sumOfCartItemsSubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  set cartItems(items: CartItem[]) {
    this.cartItemsSubject.next(items);
    this.updateSumOfCartItems();
  }

  private updateSumOfCartItems() {
    const sum = this.cartItems.reduce(
      (acc, item) => acc + item.quantity * item.dish.price,
      0,
    );
    this.sumOfCartItemsSubject.next(sum);
  }

  addItem(cartItem: Dish) {
    const items = [...this.cartItems];
    const existingItem = items.find((item) => item.dish.id === cartItem.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.push({ quantity: 1, dish: cartItem });
    }
    this.cartItems = items;
  }

  removeItem(cartItem: Dish) {
    const items = this.cartItems.filter((item) => item.dish.id !== cartItem.id);
    this.cartItems = items;
  }

  deleteOneDish(cartItem: Dish) {
    const items = [...this.cartItems];
    const existingItem = items.find((item) => item.dish.id === cartItem.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        this.cartItems = items;
      } else {
        this.removeItem(cartItem);
      }
    }
  }
}
