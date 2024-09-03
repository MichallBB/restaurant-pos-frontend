import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DishCategory } from '../../models/dish-category.model';

@Injectable({
  providedIn: 'root'
})
export class DishCategoryService {

  constructor(private http: HttpClient) { }

  getAllDishCategories(): Observable<DishCategory[]> {
    return this.http.get<DishCategory[]>('http://localhost:8080/api/dishCategory/getAll');
  }

  moveDishCategory(dishCategoryId: number, newIndex: number): Observable<DishCategory> {
    return this.http.post<DishCategory>(`http://localhost:8080/api/dishCategory/moveDishCategory/${dishCategoryId}/${newIndex}`, {});
  }

  editNameOfDishCategory(dishCategoryId: number, newName: string): Observable<DishCategory> {
    return this.http.post<DishCategory>(`http://localhost:8080/api/dishCategory/editName/${dishCategoryId}`, { name: newName});
  }

  removeDishCategory(dishCategoryId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/dishCategory/removeDishCategory/${dishCategoryId}`);
  }

}
