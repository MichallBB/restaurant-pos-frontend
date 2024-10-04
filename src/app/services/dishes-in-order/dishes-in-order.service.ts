import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class DishesInOrderService {
    http = inject(HttpClient);

    toggleCooked(dishId: number, cooked: boolean) {
        return this.http.get(`http://localhost:8080/api/dishinorder/toggleCooked/${dishId}?cooked=${cooked}`);
    }

    toggleServed(dishId: number, served: boolean) {
        return this.http.get(`http://localhost:8080/api/dishinorder/toggleServed/${dishId}?served=${served}`);
    }
}
