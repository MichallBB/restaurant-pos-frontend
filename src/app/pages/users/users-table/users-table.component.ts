import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  EmployeeAccountService,
  UserObj,
} from '../../../services/employee-account/employee-account.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RolePipe } from '../../../pipes/role.pipe';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatSlideToggle,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    CommonModule,
    RolePipe
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'actions'];
  data!: UserObj[];
  dataSource = new MatTableDataSource(this.data);
  dataLoaded = false;
  private refreshSubscription!: Subscription;

  constructor(
    private userService: EmployeeAccountService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.dataLoaded = false;
    this.userService.getAllSortedByRole().subscribe(
      (res) => {
        this.data = res;
        console.log(res);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataLoaded = true;
      },
      (error) => {
        this.toastr.error('Błąd podczas pobierania danych');
        this.dataLoaded = true;
      }
    );
  }

  editUser(user: UserObj) {
   console.log(user); 
  }
  deleteUser(user: UserObj) {
    console.log(user);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
