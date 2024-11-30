import { Component, Input } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatIconModule,
    MatRipple,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  @Input() drawer!: any;

  constructor(private authService: AuthService) {}

  logout(){
    this.authService.logout();
  }

  toggleDrawer(){
    this.drawer.toggle();
  }
}
