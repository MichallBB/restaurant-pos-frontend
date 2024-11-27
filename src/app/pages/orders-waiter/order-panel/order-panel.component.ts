import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
import { DishInOrderItemComponent } from './dish-in-order-item/dish-in-order-item.component';
import { CookedWebSocketService } from '../../../services/web-socket/cooked-websocket.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { Title } from '@angular/platform-browser';

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
    DishInOrderItemComponent,
  ],
  templateUrl: './order-panel.component.html',
  styleUrl: './order-panel.component.scss',
})
export class OrderPanelComponent implements OnInit {
  @Input() order!: Order;
  progress = 0;
  @Input() dishChanged!: number;
  @Output() endOrder = new EventEmitter<boolean>();

  constructor(
    private dishInOrderService: DishesInOrderService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    let dishes = this.order.dishes;
    this.progress =
      (dishes.filter((dish) => dish.served).length / dishes.length) * 100;
  }

  onServedToggled(event: { dishId: number; served: boolean }) {
    console.log('Dish served status changed:', event);

    this.order.dishes.map((dish) => {
      if (dish.id === event.dishId) {
        dish.served = event.served;
      }
    });
    this.progress =
      (this.order.dishes.filter((dish) => dish.served).length /
        this.order.dishes.length) *
      100;
  }

  endTheOrder() {
    console.log('Order ended:', this.order);

    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        title: 'Zakończ zamówienie',
        content: `Czy na pewno chcesz zakończyć zamówienie o numerze ${this.order.id}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dishInOrderService.endOrder(this.order.id).subscribe({
          next: () => {
            this.endOrder.emit(true);
          },
        });
      } else {
        return;
      }
    });
  }
}
