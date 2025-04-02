import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { AppRoutes } from '@config/routes';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, CustomInputComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  AppRoutes = AppRoutes;
}
