// ANGULAR
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

// SERVICES
import { AuthService } from '@services/auth/auth.service';

// VALIDATORS
import { customEmailValidator } from 'app/validators/email-validators';

// CONFIG
import { AppRoutes } from '@config/routes';
import { apiRoot } from '@config/api/api';

@Component({
  selector: 'app-login',
  imports: [
    ButtonComponent,
    CustomInputComponent,
    RouterModule,
    CustomIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  AppRoutes = AppRoutes;
  displayErrors = false;

  http = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  auth: AuthService = inject(AuthService);

  loginForm = this.formBuilder.group({
    // TODO SUPPRIMER LES INFOS QUAND TESTS FINIS
    email: ['admin@k9club.fr', [Validators.required, customEmailValidator()]],
    password: ['123456', [Validators.required]],
  });

  onConnection(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    }

    this.http
      .post(apiRoot + 'login', this.loginForm.value, {
        responseType: 'text',
      })
      .subscribe({
        next: (result) => {
          this.auth.decodeJwt(result);

          if (!this.auth.userInfos) {
            console.error('Error : User informations not found.');
            return;
          }

          const userRole = this.auth.userInfos.role;

          switch (userRole) {
            case 'ROLE_SUPER_ADMIN':
              // TODO CHANGER QUAND LA PAGE SERA READY
              this.router.navigateByUrl(AppRoutes.app.admin.dashboardFull);
              break;
            case 'ROLE_ADMIN':
              this.router.navigateByUrl(AppRoutes.app.admin.dashboardFull);
              break;
            case 'ROLE_COACH':
              // TODO CHANGER QUAND LA PAGE SERA READY
              this.router.navigateByUrl(AppRoutes.app.admin.dashboardFull);
              break;
            case 'ROLE_OWNER':
              this.router.navigateByUrl(AppRoutes.app.user.dashboardFull);
              break;
            default:
              break;
          }
        },
        error: (error) => {
          // -----------------------------------------------------------
          // TODO ICI IL FAUT QUE JE GERE QQN QUI A MAUVAIS MDP ET EMAIL
          // -----------------------------------------------------------

          // FAIRE UNE NOTIFICATION OU UN AUTRE SYSTEME

          if (error.status === 401) {
            console.log('Mauvais email ou mot de passe');
          }
        },
      });
  }

  onFieldChange() {
    this.displayErrors = false;
  }

  get emailError(): string {
    const emailControl = this.loginForm.get('email');

    if (!emailControl) {
      return '';
    }

    if ((emailControl.touched || emailControl.dirty) && emailControl.invalid) {
      if (emailControl.errors?.['required']) {
        return 'Veuillez renseigner votre email.';
      }
      if (emailControl.errors?.['invalidEmail']) {
        return 'Veuillez entrer une adresse email valide.';
      }
    }

    return '';
  }

  get passwordError(): string {
    const passwordControl = this.loginForm.get('password');

    if (!passwordControl) {
      return '';
    }

    if (
      (passwordControl.touched || passwordControl.dirty) &&
      passwordControl.invalid
    ) {
      return 'Veuillez renseigner le mot de passe';
    }

    return '';
  }
}
