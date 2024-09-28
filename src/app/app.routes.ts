import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
import { RestaurantMenuComponent } from './pages/restaurant-menu/restaurant-menu.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { UsersComponent } from './pages/users/users.component';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { OrdersChefComponent } from './pages/orders-chef/orders-chef.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomePageComponent, canActivate: [AuthGuard] , children:[
        {path: 'strona-domowa', component: DashboardComponent, canActivate: [AuthGuard]},
        { path: 'menu', component: RestaurantMenuComponent, canActivate: [AuthGuard] },
        { path: 'zamowienia', component: OrdersComponent, canActivate: [AuthGuard]},
        { path: 'zamowienia/nowe-zamowienie', component: OrderCreateComponent, canActivate: [AuthGuard] },
        { path: 'rezerwacje', component: ReservationsComponent, canActivate: [AuthGuard]},
        { path: 'uzytkownicy', component: UsersComponent, canActivate: [AuthGuard]},
        { path: 'ustawienia', component: UserSettingsPageComponent, canActivate: [AuthGuard]},
        { path: 'zamowienia-kuchni', component: OrdersChefComponent, canActivate: [AuthGuard]},
    ]},
    { path: '**', redirectTo: 'strona-domowa'},
];
