// ANGULAR
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';

// CONFIG
import { AppRoutes } from '@config/routes';

@Component({
  selector: 'app-nav-bar',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  AppRoutes = AppRoutes;
}
