import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      // check if user is loaded?
      if (this.currentUserService.currentUser) {
        return of(true);
      }
      console.log('loading user');
      return this.authService.loadCurrentUser();
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
