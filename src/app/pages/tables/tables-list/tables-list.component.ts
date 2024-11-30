import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RestaurantTableService } from '../../../services/restaurant-table/restaurant-table.service';
import { RestaurantTable } from '../../../models/restaurant-table.model';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { DialogEditTableComponent } from '../dialog-edit-table/dialog-edit-table.component';

@Component({
  selector: 'app-tables-list',
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
  templateUrl: './tables-list.component.html',
  styleUrl: './tables-list.component.scss',
})
export class TablesListComponent {
  dataLoaded = false;
  displayedColumns: string[] = ['tableNumber', 'actions'];
  data: RestaurantTable[] = [];
  dataSource = new MatTableDataSource(this.data);
  private refreshSubscription!: Subscription;

  constructor(
    private tableService: RestaurantTableService,
    private refreshService: RefreshService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getAllTables();
    this.refreshSubscription = this.refreshService.refresh$.subscribe(() => {
      this.getAllTables();
    });
  }

  getAllTables() {
    this.dataLoaded = false;
    this.tableService.getAllTables().subscribe((tables: RestaurantTable[]) => {
      this.data = tables;
      this.dataLoaded = true;
      this.dataSource = new MatTableDataSource(this.data);
    });
  }
  deleteTable(table: RestaurantTable) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        title: 'Usuń stolik',
        content: `Czy na pewno chcesz usunąć stolik (${table.tableNumber})?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tableService.removeTable(table.tableNumber).subscribe({
          next: () => {
            this.refreshService.refresh();
          },
          error: (error) => {
            if (error.status === 414) {
              this.toastr.error(
                'Nie można usunąć stolika, ponieważ jest przypisany do zamówienia',
              );
              return;
            }
            this.toastr.error('Błąd podczas usuwania dania');
          },
        });
      } else {
        return;
      }
    });
  }

  editTable(table: RestaurantTable) {
    const dialogRef = this.dialog.open(DialogEditTableComponent, {
      data: {
        table,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshService.refresh();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
