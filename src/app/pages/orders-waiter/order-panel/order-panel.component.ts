import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TimeDiffInMinutes } from '../../../pipes/time-diff-in-minutes.pipe';
import { DishesInOrderService } from '../../../services/dishes-in-order/dishes-in-order.service';

@Component({
  selector: 'app-order-panel',
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
  ],
  templateUrl: './order-panel.component.html',
  styleUrl: './order-panel.component.scss',
})
export class OrderPanelComponent implements OnInit {
  @Input() order!: Order;
  progress = 0;

  constructor(private dishInOrderService: DishesInOrderService) {}

  ngOnInit() {
    let dishes = this.order.dishes;
    this.progress = dishes.filter((dish) => dish.served).length / dishes.length * 100;
  }

  toggleServed(change: boolean, dishId: number) {
    this.dishInOrderService.toggleServed(dishId, change).subscribe({
      next: (response) => {
        console.log('response', response);
        this.order.dishes.map((dish) => {
          if (dish.id === dishId) {
            dish.served = change;
          }
        });
        this.progress = this.order.dishes.filter((dish) => dish.served).length / this.order.dishes.length * 100;
      },
    });
  }
}
