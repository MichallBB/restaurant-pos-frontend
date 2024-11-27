import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../models/order.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { OrderCardComponent } from './order-card/order-card.component';
import { ServedWebSocketService } from '../../services/web-socket/served-websocket.service';

@Component({
  selector: 'app-orders-chef',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatIconModule,
    OrderCardComponent,
  ],
  templateUrl: './orders-chef.component.html',
  styleUrl: './orders-chef.component.scss',
})
export class OrdersChefComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  dishChanged!: number;
  constructor(
    private ordersService: OrdersService,
    private webSocketService: ServedWebSocketService,
  ) {}

  ngOnInit() {
    this.connectWebSocket();

    this.ordersService.getAllActiveOrders().subscribe((orders) => {
      this.orders = orders;
      console.log('Orders:', this.orders);
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
