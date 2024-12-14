import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { EmployeeAccount } from '../../../models/employee-account';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { EmployeeAccountService } from '../../../services/employee-account/employee-account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  editUserFormGroup = new FormGroup({
    name: new FormControl(this.data.user.name, Validators.required),
    role: new FormControl(this.data.user.role, Validators.required),
  });
  private subscription!: Subscription;
  isAvailable: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: EmployeeAccount },
    private refreshService: RefreshService,
    private userService: EmployeeAccountService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  editUser() {
    if (!this.editUserFormGroup.valid) {
      return;
    }

    if (
      this.editUserFormGroup.value.name === this.data.user.name &&
      this.editUserFormGroup.value.role === this.data.user.role
    ) {
      return;
    }

    if(!this.editUserFormGroup.value.name || !this.editUserFormGroup.value.role){
      return
    }
    const user: EmployeeAccount = {
      id: this.data.user.id,
      name: this.editUserFormGroup.value.name,
      role: this.editUserFormGroup.value.role,
    };

    this.userService.editUser(user).subscribe(() => {
      this.toastr.success('User updated successfully');
      this.refreshService.refresh();
    });
  }
}
