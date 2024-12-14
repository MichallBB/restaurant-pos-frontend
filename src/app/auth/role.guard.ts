import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CurrentUserService } from "./current-user.service";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private currentUser: CurrentUserService,
        private route: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const allowedRoles = route.data['roles'] as Array<string>;

        const user = this.currentUser.currentUser;

        if(user && allowedRoles.includes(user.role)) {
            return true;
        }

        this.route.navigate(['/strona-domowa']);
        return false;
    }
}