import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../../models/order.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Dish } from '../../models/dish.model';
import { RestaurantTable } from '../../models/restaurant-table.model';
import { DishWithCategoryId } from '../../models/dish-with-category-id.model';
import { DishWithCategoryName } from '../../models/dish-with-category-name.model';

export interface OrderRequest {
  id: number;
  tableNumber: RestaurantTable;
  waiterId: number;
  dish: Dish[];
  price: number;
  quantity: number;
  specialRequest: string;
  orderStartTime: Date;
  orderEndTime: Date;
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  http = inject(HttpClient);

  getOrdersByWaiter(): Observable<Order[]> {
    return this.http.get<Order[]>(
      'http://localhost:8080/api/order/getOrdersByWaiter',
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:8080/api/order/getOrders');
  }

  createOrder(order: OrderRequest): Observable<OrderRequest> {
    return this.http.post<OrderRequest>('http://localhost:8080/api/order/createOrder', order);
  }
}
