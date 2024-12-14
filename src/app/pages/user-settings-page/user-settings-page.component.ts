import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CurrentUserService } from '../../auth/current-user.service';
import { EmployeeAccount } from '../../models/employee-account';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditPinDialogComponent } from './edit-pin-dialog/edit-pin-dialog.component';
import { EditAccDetailsDialogComponent } from './edit-acc-details-dialog/edit-acc-details-dialog.component';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeAccountService } from '../../services/employee-account/employee-account.service';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-user-settings-page',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ReactiveFormsModule, MatRipple],
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.scss',
})
export class UserSettingsPageComponent {
  user: EmployeeAccount = this.currentUserService.currentUser!;
  editMode: boolean = false;
  nameControl!: FormControl;

  constructor(
    private currentUserService: CurrentUserService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private employeeAccountService: EmployeeAccountService
  ) {
    this.nameControl = new FormControl(this.user.name, [Validators.required]);
  }

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

  saveName() {
    if(this.user.name === this.nameControl.value) {
      this.editMode = false;
      return;
    }
    if (
      this.nameControl.invalid ||
      this.nameControl.value === null
    ) {
      this.toastr.error('Nazwa nie może być pusta');
      return;
    }
    let user: EmployeeAccount = {
      id: this.user.id,
      name: this.nameControl.value,
      role: this.user.role,
    }
    this.employeeAccountService
      .changeAccountName(user)
      .subscribe({
        next: (user: EmployeeAccount) => {
          this.user = user;
          this.editMode = false;
          this.currentUserService.currentUser = user;
          this.toastr.success('Nazwa konta została zmieniona');
        },
        error: (error) => {
          this.toastr.error('Błąd podczas edycji nazwy');
        },
      });
  }

}
