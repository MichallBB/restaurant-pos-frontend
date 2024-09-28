import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DishCategory } from '../../models/dish-category.model';
import { DishWithCategoryId } from '../../models/dish-with-category-id.model';

@Injectable({
  providedIn: 'root'
})
export class DishCategoryService {

  constructor(private http: HttpClient) { }

  addDishCategory(categoryName: string): Observable<DishCategory> {
    return this.http.post<DishCategory>('http://localhost:8080/api/dishCategory', { name: categoryName });
  }

  getAllDishCategories(): Observable<DishCategory[]> {
    return this.http.get<DishCategory[]>('http://localhost:8080/api/dishCategory/getAll');
  }
  getAllEnabledDishCategories(): Observable<DishCategory[]> {
    return this.http.get<DishCategory[]>('http://localhost:8080/api/dishCategory/getAllEnabled');
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

  addDishToCategory(dish: DishWithCategoryId): Observable<DishCategory> {
    return this.http.post<DishCategory>('http://localhost:8080/api/dishCategory/addDish', dish);
  }

}
