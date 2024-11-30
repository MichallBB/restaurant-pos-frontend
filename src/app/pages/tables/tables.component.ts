import { Component, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TablesListComponent } from "./tables-list/tables-list.component";
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { DishesTableComponent } from '../restaurant-menu/dishes-table/dishes-table.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTableComponent } from './dialog-add-table/dialog-add-table.component';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    MatRipple,
    MatIcon,
    MatSlideToggle,
    DishesTableComponent,
    TablesListComponent,
    MatButtonModule
],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent {
  readonly dialog = inject(MatDialog);

  openAddTableDialog() {
    this.dialog.open(DialogAddTableComponent)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
