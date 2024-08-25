import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { UserService } from './user.service';
import { CurrentUserService } from './current-user.service';
import { EmployeeAccount } from '../models/employee-account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly storageKey = 'token';

  constructor() {}

  http = inject(HttpClient);
  router = inject(Router);
  userService = inject(UserService);
  currentUserService = inject(CurrentUserService);

  login(acc: LoginObj): Observable<EmployeeAccount> {
    return this.http
      .post<AuthResponse>(`http://localhost:8080/api/auth/login`, acc)
      .pipe(
        tap((token) => {
          this.saveToken(token.accesToken);
        }),
        switchMap(() =>
          this.userService
            .getUserByToken()
            .pipe(tap((user) => { this.currentUserService.currentUser = user; console.log(user); })),
        ),
      );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  private saveToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }
}

export interface LoginObj {
  id: number;
  pinCode: string;
}

export interface AuthResponse {
  accesToken: string;
  tokenType: string;
}
