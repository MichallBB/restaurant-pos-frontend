import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { DishInOrder } from '../../../../models/dish-in-order.model';
import { DishesInOrderService } from '../../../../services/dishes-in-order/dishes-in-order.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-chef-list-dish-in-order-item',
  standalone: true,
  imports: [
    MatCheckbox
  ],
  templateUrl: './chef-list-dish-in-order-item.component.html',
  styleUrl: './chef-list-dish-in-order-item.component.scss'
})
export class ChefListDishInOrderItemComponent implements OnInit, OnChanges {
  @Output() cookedToggled = new EventEmitter<{ dishId: number, cooked: boolean }>();  
  toastr = inject(ToastrService);

  private changeProgressSubject = new Subject<{ change: boolean, dishId: number }>();
  private subscription!: Subscription;

  @Input() dishInOrder!: DishInOrder;
  @Input() dishIdChanged!: number;

  constructor(
    private dishInOrderService: DishesInOrderService,
  ) { }

  changeProgress(change: boolean) {
    console.log('Dish cooked status changed:', change);
    this.cookedToggled.emit({ dishId: this.dishInOrder.id, cooked: change });
    this.changeProgressSubject.next({ change, dishId: this.dishInOrder.id });
  }

  ngOnInit(): void {
    this.subscription = this.changeProgressSubject.pipe(
      debounceTime(800), // Adjust the debounce time as needed
      switchMap(({ change, dishId }) => this.dishInOrderService.toggleCooked(dishId, change))
    ).subscribe({
      error: (error) => {
        this.toastr.error('Błąd podczas zmiany statusu dania');
        this.cookedToggled.emit({ dishId: this.dishInOrder.id, cooked: !this.dishInOrder.cooked });
      }
    });
  }

  ngOnChanges(): void {
    if (this.dishIdChanged === this.dishInOrder.id) {
      this.dishInOrder.served = !this.dishInOrder.served;
    }
  }
}
