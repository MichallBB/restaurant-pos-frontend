import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatIconModule,],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  changeProgress(change: boolean) {
    if (change) {
      this.progress += 100 / this.order.dish.length;
    } else {
      this.progress -= 100 / this.order.dish.length;
    }
  }
  @Input() order!: Order;

  progress = 0;

  constructor() {}



}
