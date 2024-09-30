import { Component, Input, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Order } from '../../../models/order.model';
import { TimeDiffInMinutes } from '../../../pipes/time-diff-in-minutes.pipe';
import { CommonModule } from '@angular/common';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    TimeDiffInMinutes,
    CommonModule,
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  progress = 0;
  checked: { dishId: number, checked: boolean }[] = [];

  constructor() {}

  ngOnInit() {
    
    this.order.dish.forEach((dish) => {
      this.checked.push({ dishId: dish.id, checked: false });
    });
    localStorage.setItem('checked', JSON.stringify(this.checked));
  }

  changeProgress(change: boolean, dishId: number) {
    if (change) {
      this.progress += 100 / this.order.dish.length;
    } else {
      this.progress -= 100 / this.order.dish.length;
    }

  }
}
