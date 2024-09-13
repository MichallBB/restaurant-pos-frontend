import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-dialog-edit-dish',
  standalone: true,
  imports: [    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,],
  templateUrl: './dialog-edit-dish.component.html',
  styleUrl: './dialog-edit-dish.component.scss'
})
export class DialogEditDishComponent {
  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Dish,
  ) {console.log(data);}

  ngOnInit() {
    this.formGroup = new FormGroup({
      id: new FormControl(this.data.id),
      
    });
  }
}
