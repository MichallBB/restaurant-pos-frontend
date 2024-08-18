import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatIcon,
    MatRipple,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {


  constructor(private authService: AuthService) { }

  logout(){
    this.authService.logout();
  }
}
