import { Component } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DishWithCategoryName } from '../../../models/dish-with-category-name.model';
import { DishService } from '../../../services/dish-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dishes-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatSlideToggle,
    MatInputModule,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './dishes-table.component.html',
  styleUrl: './dishes-table.component.scss'
})
export class DishesTableComponent {
  displayedColumns: string[] = ['name', 'dishCategoryName', 'description', 'price', 'active' , 'actions'];
  dataSource!: DishWithCategoryName[];
  dataLoaded = false;

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.dishService.getAllDishes().subscribe(dishes => {
      console.log(dishes);
      this.dataSource = dishes;
      this.dataLoaded = true;
    });
  }

  toggleDishActive(dish: number, event: boolean) {
    console.log(dish);
    console.log(event);
    this.dishService.toggleDishActive(dish, event).subscribe(updatedDish => {
      const dishIndex = this.dataSource.findIndex(d => d.id === updatedDish.id);
      //this.dataSource[dishIndex] = updatedDish;
      console.log(this.dataSource[dishIndex]);
    });
  }


}
