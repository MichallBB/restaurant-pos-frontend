import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookedWebSocketService } from '../../services/web-socket/cooked-websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {

  constructor() {}

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
  }
}
