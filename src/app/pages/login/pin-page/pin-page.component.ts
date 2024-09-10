import { Component, Input, OnInit, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { CharAtPipe } from '../../../pipes/char-at.pipe';
import { EmployeeAccount } from '../../../models/employee-account';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginObj } from '../../../auth/auth.service';

@Component({
  selector: 'app-pin-page',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatRipple,
    CharAtPipe
  ],
  templateUrl: './pin-page.component.html',
  styleUrl: './pin-page.component.scss'
})
export class PinPageComponent {
  pin: string = '';
  digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  @Input() accountForPin!: EmployeeAccount;


  constructor(private router: Router, private authService: AuthService) { }

  addDigit(digit: number) {
    if (this.pin.length < 4) {
      this.pin += digit;
    }
    if (this.pin.length === 4) {
      this.confirmPin();
    }
  }

  deleteDigit() {
    this.pin = this.pin.slice(0, -1);
  }

  confirmPin() {
    console.log('PIN confirmed:', this.pin, 'for account:', this.accountForPin);
    localStorage.setItem('last-account-id', this.accountForPin.id.toString());

    let acc: LoginObj = {
      id: this.accountForPin.id,
      pinCode: this.pin
    }
    this.authService.login(acc).subscribe({
      next: () => {
        this.router.navigate(['/strona-domowa']);
      },
      error: (err) => {
        console.log('Login error:', err);
        this.pin = '';
      }
    });

    //this.router.navigate(['/dashboard']);
  }

}
