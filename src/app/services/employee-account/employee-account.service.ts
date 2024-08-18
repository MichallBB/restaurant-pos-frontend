import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeAccount } from '../../models/employee-account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAccountService {

  constructor() { }

  http = inject(HttpClient);

  getAllEmployees(): Observable<EmployeesResponse> {
    return this.http.get<EmployeesResponse>(`http://localhost:8080/api/employeeAccount/getAll`);
  }

  getEmployeeById(id: number): Observable<EmployeeAccount> {
    return this.http.get<EmployeeAccount>(`http://localhost:8080/api/employeeAccount/${id}`);
  }

  
}

export interface EmployeesResponse {
  ADMIN: EmployeeAccount[];
  CHEF: EmployeeAccount[];
  WAITER: EmployeeAccount[];
}