import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DishWithCategoryName } from '../../../models/dish-with-category-name.model';
import { DishService } from '../../../services/dish-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog-edit-dish-categories/category-item/confirm-dialog/confirm-dialog.component';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { Title } from '@angular/platform-browser';
import { Dish } from '../../../models/dish.model';
import { ToastrService } from 'ngx-toastr';
import { DialogEditDishComponent } from '../dialog-edit-dish/dialog-edit-dish.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dishes-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatSlideToggle,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './dishes-table.component.html',
  styleUrl: './dishes-table.component.scss',
})
export class DishesTableComponent {
  displayedColumns: string[] = [
    'name',
    'dishCategoryName',
    'description',
    'price',
    'active',
    'actions',
  ];
  data!: DishWithCategoryName[];
  dataSource = new MatTableDataSource(this.data);
  dataLoaded = false;
  private refreshSubscription!: Subscription;

  constructor(
    private dishService: DishService,
    private refreshService: RefreshService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getAllDishes();
    this.refreshSubscription = this.refreshService.refresh$.subscribe(() => {
      this.getAllDishes();
    });
  }

  getAllDishes() {
    this.dataLoaded = false;
    this.dishService.getAllDishes().subscribe((dishes) => {
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
    this.dishService.toggleDishActive(dish, event).subscribe((updatedDish) => {
      const dishIndex = this.dataSource.data.findIndex(
        (d) => d.id === updatedDish.id,
      );
      this.dataSource.data[dishIndex] = updatedDish;
      console.log(this.dataSource.data[dishIndex]);
    });
  }

  deleteDish(dish: Dish) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        title: 'Usuń danie',
        content: `Czy na pewno chcesz usunąć danie (${dish.name})?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dishService.removeDish(dish.id).subscribe({
          next: () => {
            this.refreshService.refresh();
          },
          error: (error) => {
            this.toastr.error('Błąd podczas usuwania dania');
          },
        });
      } else {
        return;
      }
    });
  }

  editDish(dish: Dish) {
    const dialogRef = this.dialog.open(DialogEditDishComponent, {
      data: dish,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshService.refresh();
      }
    });
  }
}
