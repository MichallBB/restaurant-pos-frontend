import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeAccount } from '../models/employee-account';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor() { }

    http = inject(HttpClient)

    getUserByToken(): Observable<EmployeeAccount> {
        return this.http.get<EmployeeAccount>(`http://localhost:8080/api/employeeAccount/getByToken`);
    }

    changePin(id: number, oldPin: string, newPin: string): Observable<EmployeeAccount> {
        return this.http.post<EmployeeAccount>(`http://localhost:8080/api/employeeAccount/changePin`, {id: id, oldPin: oldPin, newPin: newPin});
    }
}