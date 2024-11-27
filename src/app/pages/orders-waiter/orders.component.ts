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
import { OrderPanelComponent } from './order-panel/order-panel.component';
import { CookedWebSocketService } from '../../services/web-socket/cooked-websocket.service';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';

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
    OrderPanelComponent,
    MatProgressSpinner
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  orders: Order[] = [];
  dishChanged!: number;
  ordersLoaded: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private webSocketService: CookedWebSocketService,
  ) {}

  ngOnInit() {
    this.connectWebSocket();

    this.getOrders();
  }

  getOrders() {
    this.ordersLoaded = false;
    this.ordersService.getOrdersByWaiter().subscribe((orders) => {
      this.orders = orders;
      this.ordersLoaded = true;
    });
  }

  connectWebSocket() {
    this.webSocketService.getMessages().subscribe((message: string) => {
      console.log('Message:', message);
      let dishId = Number(message);
      if (this.dishChanged === dishId) {
        this.dishChanged = 0;

        console.log('Dish changed:', dishId);
        setTimeout(() => {
          this.dishChanged = dishId;
        }, 1000);
      } else {
        this.dishChanged = Number(message);
      }
    });
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }
}
