import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
import { RestaurantMenuComponent } from './pages/restaurant-menu/restaurant-menu.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomePageComponent, children:[
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
        { path: 'menu', component: RestaurantMenuComponent, canActivate: [AuthGuard] }
    ]},
    { path: '**', redirectTo: 'login'}
];
