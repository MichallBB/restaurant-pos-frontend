import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private router: Router) { }

    canActivate(): boolean {
        return this.checkAuth();
    }

    // TODO: sprawdzac czy token jest poprawny przez backend?, czy authguard dla kazdej roli? 
    private checkAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
} 