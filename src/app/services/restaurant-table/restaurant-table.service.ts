import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RestaurantTable } from '../../models/restaurant-table.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantTableService {
  constructor() {}

  http = inject(HttpClient);

    getAllTables(): Observable<RestaurantTable[]> {
        return this.http.get<RestaurantTable[]>(`http://localhost:8080/api/table/getAllTables`);
    }
}
