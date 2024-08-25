import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { DishesTableComponent } from "./dishes-table/dishes-table.component";

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [
    MatButton,
    MatRipple,
    MatIcon,
    MatSlideToggle,
    DishesTableComponent
],
  templateUrl: './restaurant-menu.component.html',
  styleUrl: './restaurant-menu.component.scss'
})
export class RestaurantMenuComponent {


}
