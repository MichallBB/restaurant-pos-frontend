import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DishInOrder } from "../../models/dish-in-order.model";

@Injectable({
  providedIn: 'root',
})
export class DishesInOrderService {
    http = inject(HttpClient);

    toggleCooked(dishId: number, cooked: boolean) {
        return this.http.get(`http://localhost:8080/api/dishinorder/toggleCooked/${dishId}?cooked=${cooked}`);
    }

    toggleServed(dishId: number, served: boolean): Observable<DishInOrder> {
        return this.http.get<DishInOrder>(`http://localhost:8080/api/dishinorder/toggleServed/${dishId}?served=${served}`);
    }

    endOrder(orderId: number) {
        return this.http.get(`http://localhost:8080/api/order/endOrder/${orderId}`);
    }
}
