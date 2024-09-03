import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { PinPageComponent } from './pin-page/pin-page.component';
import { CharAtPipe } from '../../pipes/char-at.pipe';
import { EmployeeAccount } from '../../models/employee-account';
import {
  EmployeeAccountService,
  EmployeesResponse,
} from '../../services/employee-account/employee-account.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatRippleModule,
    PinPageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  owners!: EmployeeAccount[];
  chefs!: EmployeeAccount[];
  waiters!: EmployeeAccount[];

  @Output() confirmedAccount!: EmployeeAccount | undefined;
  selectedAccount!: EmployeeAccount;
  lastAccount!: EmployeeAccount;

  emptyEmployeeAccount: EmployeeAccount = {
    id: -1,
    name: '',
    role: '',
  }

  accountControlForm: FormGroup = new FormGroup({
    accountControl: new FormControl(this.emptyEmployeeAccount, Validators.required),
  });

  constructor(private accountsService: EmployeeAccountService) {}

  ngOnInit(): void {
    this.getAllEmployees();

    let lastAccount = parseInt(localStorage.getItem('last-account-id') ?? '-1');
    if (lastAccount !== -1) {
      this.getEmployeeById(lastAccount);
    }
  }

  getEmployeeById(id: number) {
    this.accountsService.getEmployeeById(id).subscribe({
      next: (employee: EmployeeAccount) => {
        this.lastAccount = employee;
      },
    });
  }

  getAllEmployees() {
    this.accountsService.getAllEmployees().subscribe({
      next: (employees: EmployeesResponse) => {
        this.owners = employees.ADMIN;
        this.chefs = employees.CHEF;
        this.waiters = employees.WAITER;
      },
    });
  }

  submitByLastAcc(employeeAcc: EmployeeAccount) {
    this.confirmedAccount = employeeAcc;
  }

  submit() {
    console.log(this.accountControlForm.value.accountControl);
    if (this.accountControlForm.value.accountControl.id === -1) {
      this.accountControlForm.controls['accountControl'].setErrors({
        incorrect: true,
      });
    }

    if (this.accountControlForm.valid) {
      {
        this.confirmedAccount = this.accountControlForm.value.accountControl;
      }
    }
  }
}
