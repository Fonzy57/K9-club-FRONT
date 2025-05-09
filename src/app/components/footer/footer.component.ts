// ANGULAR
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// COMPONENTS
import { ButtonComponent } from '../button/button.component';
import { CopyrightComponent } from '../copyright/copyright.component';

// CONFIG
import { AppRoutes } from '@config/routes';

@Component({
  selector: 'app-footer',
  imports: [ButtonComponent, CopyrightComponent, RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  AppRoutes = AppRoutes;
}
