import { Injectable } from '@angular/core';
import { EmployeeAccount } from '../models/employee-account';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  currentUser: EmployeeAccount | null = null;
}
