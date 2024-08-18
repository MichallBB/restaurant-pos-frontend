import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  http = inject(HttpClient);
  router = inject(Router);

  login(acc: LoginObj): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`http://localhost:8080/api/auth/login`, acc);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
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