import { Component } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { AppRoutes } from '@config/routes';

@Component({
  selector: 'app-nav-bar',
  imports: [ButtonComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  AppRoutes = AppRoutes;
}
