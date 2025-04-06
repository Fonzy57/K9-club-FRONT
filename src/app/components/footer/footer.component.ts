import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { AppRoutes } from '@config/routes';
import { CopyrightComponent } from '../copyright/copyright.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ButtonComponent, CopyrightComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  AppRoutes = AppRoutes;
}
