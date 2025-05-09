// ANGULAR
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { BackButtonComponent } from '@components/back-button/back-button.component';

// CONFIG
import { AppRoutes } from '@config/routes';

// SERVICES

@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    CustomInputComponent,
    RouterModule,
    BackButtonComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  AppRoutes = AppRoutes;
}
