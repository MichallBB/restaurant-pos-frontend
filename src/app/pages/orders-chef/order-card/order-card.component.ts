import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import {
  catchError,
  debounceTime,
  Subject,
  Subscription,
  switchMap,
  throwError,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ChefListDishInOrderItemComponent } from './chef-list-dish-in-order-item/chef-list-dish-in-order-item.component';

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
    ChefListDishInOrderItemComponent,
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  @Input() dishIdChanged!: number;
  progress = 0;

  constructor(private dishInOrderService: DishesInOrderService) {}

  ngOnInit() {
    let dishes = this.order.dishes;
    this.progress =
      (dishes.filter((dish) => dish.cooked).length / dishes.length) * 100;
  }

  onCookedToggle(event: { dishId: number; cooked: boolean }) {
    console.log('Dish cooked status changed:', event);

    this.order.dishes.map((dish) => {
      if (dish.id === event.dishId) {
        dish.cooked = event.cooked;
      }
    });
    this.progress =
      (this.order.dishes.filter((dish) => dish.cooked).length /
        this.order.dishes.length) *
      100;
  }
}
