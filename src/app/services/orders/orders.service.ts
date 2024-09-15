import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  http = inject(HttpClient);

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      'http://localhost:8080/api/order/getOrdersByWaiter',
    );
  }
}
