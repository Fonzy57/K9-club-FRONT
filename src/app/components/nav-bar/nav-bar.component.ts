import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';
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
