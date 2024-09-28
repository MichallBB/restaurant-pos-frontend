import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../models/order.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { OrderCardComponent } from "./order-card/order-card.component";

@Component({
  selector: 'app-orders-chef',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatIconModule,
    OrderCardComponent
],
  templateUrl: './orders-chef.component.html',
  styleUrl: './orders-chef.component.scss'
})
export class OrdersChefComponent {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
