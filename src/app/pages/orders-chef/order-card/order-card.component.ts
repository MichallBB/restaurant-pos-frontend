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
import { DishesInOrderService } from '../../../services/dishes-in-order/dishes-in-order.service';

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
    CommonModule
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  progress = 0;
  checked: { dishId: number, checked: boolean }[] = [];

  constructor(private dishInOrderService: DishesInOrderService) {}

  ngOnInit() {
    let dishes = this.order.dishes;
    this.progress = dishes.filter((dish) => dish.cooked).length / dishes.length * 100;
  }

  changeProgress(change: boolean, dishId: number) {
    console.log('changeProgress', change, dishId);
    this.progress = change ? this.progress + 100 / this.order.dishes.length : this.progress - 100 / this.order.dishes.length;
    this.dishInOrderService.toggleCooked(dishId, change).subscribe({
      next: (response) => {
        console.log('response', response);
      }
    });

  }
}
