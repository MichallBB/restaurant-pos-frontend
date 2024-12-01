import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { OrderHistory } from "../../models/orders-history.model";
import { HistoryDish } from "../../models/history-dish.model";

@Injectable({
  providedIn: 'root',
})
export class OrdersHistoryService {
  http = inject(HttpClient);


  getTodayOrders(): Observable<OrderHistory[]> {
    return this.http.get<OrderHistory[]>('http://localhost:8080/api/ordersHistory/getToday');
  }

  getDishesFromLastWeek(): Observable<HistoryDish[]> {
    return this.http.get<HistoryDish[]>('http://localhost:8080/api/ordersHistory/getDishesFromLastWeek');
  }
}
