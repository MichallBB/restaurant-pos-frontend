import { Component } from '@angular/core';
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
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService, registerObj } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  newUserFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  private subscription!: Subscription;

  constructor(
    private refreshService: RefreshService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  addNewUser(): void {
    if (!this.newUserFormGroup.valid) {
      return;
    }

    const user: registerObj = {
      name: this.newUserFormGroup.value.name ?? '',
      role: this.newUserFormGroup.value.role ?? '',
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.refreshService.refresh();
        this.toastr.success('Dodano nowego użytkownika');
      },
      error: () => {
        this.toastr.error('Błąd podczas dodawania użytkownika');
      },
    });
  }
}
