import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DishWithCategoryName } from '../models/dish-with-category-name.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getAllDishes(): Observable<DishWithCategoryName[]> {
    return this.http.get<DishWithCategoryName[]>('http://localhost:8080/api/dish/getAllDishes');
  }

  toggleDishActive(dishId: number, active: boolean): Observable<DishWithCategoryName> {
    console.log(dishId);
    return this.http.post<DishWithCategoryName>(`http://localhost:8080/api/dish/toggleIsEnable/${dishId}`, { isEnabled: active });
  }
}
