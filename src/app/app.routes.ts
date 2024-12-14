import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
import { RestaurantMenuComponent } from './pages/restaurant-menu/restaurant-menu.component';
import { OrdersComponent } from './pages/orders-waiter/orders.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { UsersComponent } from './pages/users/users.component';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { OrdersChefComponent } from './pages/orders-chef/orders-chef.component';
import { TablesComponent } from './pages/tables/tables.component';
import { RoleGuard } from './auth/role.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'WAITER', 'CHEF'] },
    children: [
      {
        path: 'strona-domowa',
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'WAITER', 'CHEF'] },
      },
      {
        path: 'menu',
        component: RestaurantMenuComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'zamowienia',
        component: OrdersComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'WAITER'] },
      },
      {
        path: 'zamowienia/nowe-zamowienie',
        component: OrderCreateComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'WAITER'] },
      },
      {
        path: 'stoliki',
        component: TablesComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'uzytkownicy',
        component: UsersComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'ustawienia',
        component: UserSettingsPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'WAITER', 'CHEF'] },
      },
      {
        path: 'zamowienia-kuchni',
        component: OrdersChefComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'CHEF'] },
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
