import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CategoryItemComponent } from '../category-item.component'; 
import { DishCategory } from '../../../../../models/dish-category.model'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-confirm-dialog',
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
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  confirmFormControl = new FormControl('', [
    Validators.required,
    this.matchElementNameValidator(this.data.element.name),
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { element: DishCategory },
  ) {}

  matchElementNameValidator(elementName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === elementName ? null : { mismatch: true };
    };
  }
}
