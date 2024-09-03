import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DishWithCategoryName } from '../../../models/dish-with-category-name.model';
import { DishService } from '../../../services/dish-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { Subscription } from 'rxjs';

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
  data!: DishWithCategoryName[];
  dataSource = new MatTableDataSource(this.data);
  dataLoaded = false;
  private refreshSubscription!: Subscription;

  constructor(private dishService: DishService, private refreshService: RefreshService) { }

  ngOnInit() {
    this.getAllDishes();
    this.refreshSubscription = this.refreshService.refresh$.subscribe(() => {
      this.getAllDishes();
    });
  }

  getAllDishes() {
    this.dataLoaded = false;
    this.dishService.getAllDishes().subscribe(dishes => {
      console.log(dishes);
      this.data = dishes;
      this.dataLoaded = true;
      this.dataSource = new MatTableDataSource(this.data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  toggleDishActive(dish: number, event: boolean) {
    this.dishService.toggleDishActive(dish, event).subscribe(updatedDish => {
      const dishIndex = this.dataSource.data.findIndex(d => d.id === updatedDish.id);
      this.dataSource.data[dishIndex] = updatedDish;
      console.log(this.dataSource.data[dishIndex]);
    });
  }


}
