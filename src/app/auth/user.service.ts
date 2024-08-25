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
    // Add your service methods here

    getUserByToken(): Observable<EmployeeAccount> {
        return this.http.get<EmployeeAccount>(`http://localhost:8080/api/employeeAccount/getByToken`);
    }


}