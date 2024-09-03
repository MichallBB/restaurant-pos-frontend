import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-dish',
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
  templateUrl: './dialog-add-dish.component.html',
  styleUrl: './dialog-add-dish.component.scss',
})
export class DialogAddDishComponent {}
