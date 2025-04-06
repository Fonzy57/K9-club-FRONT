import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { AppRoutes } from '@config/routes';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    CustomInputComponent,
    RouterModule,
    CustomIconComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  AppRoutes = AppRoutes;
}
