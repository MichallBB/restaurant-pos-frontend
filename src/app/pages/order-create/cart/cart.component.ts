import { Component, Input } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() cartItems: Dish[] = [];
  @Input() sumOfCartItems = 0;
}
