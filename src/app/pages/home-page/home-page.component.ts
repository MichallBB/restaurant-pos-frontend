import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from "../../shared/side-nav/side-nav.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
    SideNavComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
