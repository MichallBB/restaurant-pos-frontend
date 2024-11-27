import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dish } from '../../../../models/dish.model';
import { DishInOrder } from '../../../../models/dish-in-order.model';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { DishesInOrderService } from '../../../../services/dishes-in-order/dishes-in-order.service';
import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dish-in-order-item',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatIcon
  ],
  templateUrl: './dish-in-order-item.component.html',
  styleUrl: './dish-in-order-item.component.scss'
})
export class DishInOrderItemComponent implements OnChanges, OnInit {
  @Input() dish!: DishInOrder;
  @Output() servedToggled = new EventEmitter<{ dishId: number, served: boolean }>();
  @Input() dishChangedId!: number;
  toastr = inject(ToastrService);

  private changeProgressSubject = new Subject<{ change: boolean, dishId: number }>();
  private subscription!: Subscription;

  constructor(private dishInOrderService: DishesInOrderService) {}

  ngOnChanges(): void {
    if (this.dishChangedId === this.dish.id) {
      this.dish.cooked = !this.dish.cooked;
    }
  }

  ngOnInit() {
    this.subscription = this.changeProgressSubject.pipe(
      debounceTime(800), // Adjust the debounce time as needed
      switchMap(({ change, dishId }) => this.dishInOrderService.toggleServed(dishId, change))
    ).subscribe({
      error: (error) => {
        this.toastr.error('Błąd podczas zmiany statusu dania');
        this.servedToggled.emit({ dishId: this.dish.id, served: !this.dish.served });
      }
    });
  }
  
  toggleServed(change: boolean) {
    this.servedToggled.emit({ dishId: this.dish.id, served: change });
    this.changeProgressSubject.next({ change, dishId: this.dish.id });
  }
}
