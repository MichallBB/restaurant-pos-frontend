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
            .pipe(tap((user) => { 
              this.currentUserService.currentUser = user; 
            })),
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

  loadCurrentUser(): Observable<boolean> {
    return this.userService.getUserByToken().pipe(
      tap((user) => {
        this.currentUserService.currentUser = user;
      }),
      switchMap(() => [true]),
    );
  }

  register(acc: registerObj): Observable<string> {
    return this.http.post<string>('http://localhost:8080/api/auth/register', acc);
  }
}

export interface LoginObj {
  id: number;
  pinCode: string;
}

export interface registerObj {
  name: string;
  role: string;
}

export interface AuthResponse {
  accesToken: string;
  tokenType: string;
}
