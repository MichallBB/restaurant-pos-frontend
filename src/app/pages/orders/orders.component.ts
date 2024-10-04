import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../models/order.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TimeDiffInMinutes } from '../../pipes/time-diff-in-minutes.pipe';
import { CommonModule } from '@angular/common';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { DishesInOrderService } from '../../services/dishes-in-order/dishes-in-order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatProgressBarModule,
    RouterLink,
    RouterLinkActive,
    TimeDiffInMinutes,
    CommonModule,
    MatCheckboxModule,
    MatIcon,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
    private dishInOrderService: DishesInOrderService,
  ) {}

  ngOnInit() {
    this.ordersService.getOrdersByWaiter().subscribe((orders) => {
      this.orders = orders;
      console.log('Orders:', this.orders);
    });
  }

  toggleServed(change: boolean, dishId: number) {
    this.dishInOrderService.toggleServed(dishId, change).subscribe({
      next: (response) => {
        console.log('response', response);
        
        this.orders.map((order) => {
          order.dishes.map((dish) => {
            if (dish.id === dishId) {
              dish.served = change;
            }
          });
        });
      },
    });
  }
}
