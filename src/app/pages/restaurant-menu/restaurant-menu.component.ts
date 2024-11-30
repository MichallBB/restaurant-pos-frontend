import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { DishesTableComponent } from './dishes-table/dishes-table.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditDishCategoriesComponent } from './dialog-edit-dish-categories/dialog-edit-dish-categories.component';
import { DialogAddDishComponent } from './dialog-add-dish/dialog-add-dish.component';

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [
    MatButton,
    MatRipple,
    MatIcon,
    MatSlideToggle,
    DishesTableComponent,
  ],
  templateUrl: './restaurant-menu.component.html',
  styleUrl: './restaurant-menu.component.scss',
})
export class RestaurantMenuComponent {
  readonly dialog = inject(MatDialog);

  openEditDialog(): void {
    const dialogRef = this.dialog.open(DialogEditDishCategoriesComponent, {
      width: '700px',
      height: '500px',
    });
  }

  openAddDishDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDishComponent, {
      width: '700px',
      height: '500px',
    });
  }
}
