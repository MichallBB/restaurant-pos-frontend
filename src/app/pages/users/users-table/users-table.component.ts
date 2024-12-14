import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  EmployeeAccountService,
} from '../../../services/employee-account/employee-account.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RolePipe } from '../../../pipes/role.pipe';
import { EmployeeAccount } from '../../../models/employee-account';
import { RefreshService } from '../../../services/dish-category/refresh-dish-category.service';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { CurrentUserService } from '../../../auth/current-user.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    CommonModule,
    RolePipe
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'role', 'actions'];
  data!: EmployeeAccount[];
  dataSource = new MatTableDataSource(this.data);
  dataLoaded = false;
  currentLoadedUser!: EmployeeAccount | null;
  private refreshSubscription!: Subscription;

  constructor(
    private userService: EmployeeAccountService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private refreshService: RefreshService,
    private currentUser: CurrentUserService,
  ) {}

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.currentLoadedUser = this.currentUser.currentUser;

    this.refreshSubscription = this.refreshService.refresh$.subscribe(() => {
      this.getAllUsers();
    });
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

  editUser(user: EmployeeAccount) {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: {
        user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshService.refresh();
      }
    });
  }


  deleteUser(user: EmployeeAccount) {
    if(this.currentUser.currentUser?.id === user.id){
      this.toastr.error('Nie można usunąć aktualnie zalogowanego użytkownika');
      return;
    }
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        title: 'Usuń użytkownika',
        content: `Czy na pewno chcesz usunąć użytkownika - ${user.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.refreshService.refresh();
          },
          error: (error) => {
            if (error.status === 414) {
              this.toastr.error(
                'Nie można usunąć użytkownika',
              );
              return;
            }
            this.toastr.error('Błąd podczas usuwania użytkownika');
          },
        });
      } else {
        return;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
