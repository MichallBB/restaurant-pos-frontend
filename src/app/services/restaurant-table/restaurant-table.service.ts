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
    return this.http.get<RestaurantTable[]>(
      `http://localhost:8080/api/table/getAllTables`,
    );
  }

  createTable(table: RestaurantTable): Observable<RestaurantTable> {
    return this.http.post<RestaurantTable>(
      `http://localhost:8080/api/table/createTable`,
      table,
    );
  }

  checkAvailability(tableNumber: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(
      `http://localhost:8080/api/table/checkTable/${tableNumber}`,
    );
  }

  removeTable(tableNumber: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8080/api/table/deleteTable/${tableNumber}`,
    );
  }

  editTable(id: number, tableNumber: string): Observable<RestaurantTable> {
    return this.http.get<RestaurantTable>(
      `http://localhost:8080/api/table/editTable/${id}/${tableNumber}`,
    );
  }
}
