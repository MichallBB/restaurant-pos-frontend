import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../models/order.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatProgressBarModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService.getOrdersByWaiter().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
