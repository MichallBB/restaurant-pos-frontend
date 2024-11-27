import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { UsersTableComponent } from "./users-table/users-table.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatRipple,
    MatSlideToggle,
    UsersTableComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  readonly dialog = inject(MatDialog);

  constructor() {}

  addNewUser() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {

    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`The dialog was closed + ${result}`);
      if (result !== undefined) {
      }
    });
  }
}
