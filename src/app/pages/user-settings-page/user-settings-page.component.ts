import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CurrentUserService } from '../../auth/current-user.service';
import { EmployeeAccount } from '../../models/employee-account';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditPinDialogComponent } from './edit-pin-dialog/edit-pin-dialog.component';
import { EditAccDetailsDialogComponent } from './edit-acc-details-dialog/edit-acc-details-dialog.component';

@Component({
  selector: 'app-user-settings-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.scss',
})
export class UserSettingsPageComponent {
  user: EmployeeAccount = this.currentUserService.currentUser!;
  constructor(
    private currentUserService: CurrentUserService,
    private dialog: MatDialog,
  ) {}

  openEditPinDialog() {
    const dialogRef: MatDialogRef<EditPinDialogComponent, boolean> =
      this.dialog.open(EditPinDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        return;
      }
    });
  }

  openEditAccDetailsDialog() {
    const dialogRef = this.dialog.open(EditAccDetailsDialogComponent);
  }
}
