import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrentUserService } from '../../../auth/current-user.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../auth/user.service';

@Component({
  selector: 'app-edit-pin-dialog',
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
  ],
  templateUrl: './edit-pin-dialog.component.html',
  styleUrl: './edit-pin-dialog.component.scss',
})
export class EditPinDialogComponent {
  pinForm!: FormGroup;

  constructor(
    private currentUserService: CurrentUserService,
    private toastr: ToastrService,
    private userService: UserService,
    private dialogRef: MatDialogRef<EditPinDialogComponent, boolean>,
  ) {}

  ngOnInit() {
    this.pinForm = new FormGroup(
      {
        oldPin: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
        newPin: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
        newPinRepeated: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]),
      },
      { validators: this.matchPasswordsValidator() },
    );
  }

  submitChangePin() {
    console.log(this.pinForm.value);
    let acc_id = this.currentUserService.currentUser?.id;
    if (!acc_id) {
      this.toastr.error('Błąd podczas zmiany pinu');
      return;
    }
    this.userService
      .changePin(acc_id, this.pinForm.value.oldPin, this.pinForm.value.newPin)
      .subscribe({
        next: (response) => {
          this.toastr.success('Pomyślnie zmieniono pin');
          this.dialogRef.close(true);
        },
        error: (error) => {
          if (error.status === 411) {
            this.toastr.error('Nieprawidłowy stary pin');
          } else if (error.status === 415) {
            this.toastr.warning('Nowy pin nie może być taki sam jak stary pin');
          } else {
            this.toastr.error('Błąd podczas zmiany pinu');
          }
        },
      });
  }

  onInputDeleteChar(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  matchPasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const newPin = formGroup.get('newPin')?.value;
      const newPinRepeated = formGroup.get('newPinRepeated')?.value;
      if (newPin !== newPinRepeated) {
        formGroup.get('newPinRepeated')?.setErrors({ passwordsMismatch: true });
      }
      if (newPin === newPinRepeated) {
        formGroup.get('newPinRepeated')?.setErrors(null);
      }

      return newPin === newPinRepeated ? null : { passwordsMismatch: true };
    };
  }
}
