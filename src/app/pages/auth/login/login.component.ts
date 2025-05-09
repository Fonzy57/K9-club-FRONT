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
import { BackButtonComponent } from '@components/back-button/back-button.component';

// SERVICES
import { AuthService } from '@services/auth/auth.service';
import { ToastMessageService } from '@services/toast/toast-message.service';

// VALIDATORS
import { FormValidators } from 'app/validators/form-validators';

// CONFIG
import { AppRoutes } from '@config/routes';
import { apiRoot } from '@config/api/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ButtonComponent,
    CustomInputComponent,
    FormsModule,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  AppRoutes = AppRoutes;
  displayErrors = false;

  http = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  auth: AuthService = inject(AuthService);
  toast: ToastMessageService = inject(ToastMessageService);

  loginForm = this.formBuilder.group({
    // TODO SUPPRIMER LES INFOS QUAND TESTS FINIS
    email: ['admin@k9club.fr', FormValidators.emailValidator()],
    password: ['123456', [Validators.required]],
  });

  onConnection(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    }

    this.http
      .post(apiRoot + '/login', this.loginForm.value, {
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
              this.router.navigateByUrl(AppRoutes.app.coach.dashboardFull);
              break;
            case 'ROLE_OWNER':
              this.router.navigateByUrl(AppRoutes.app.user.dashboardFull);
              break;
            default:
              break;
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.toast.show({
              severity: 'error',
              title: 'Erreur',
              content: 'E-mail ou mot de passe incorrect',
              time: 5000,
            });
          }
        },
      });
  }

  onFieldChange() {
    this.displayErrors = false;
  }

  get emailError() {
    const control = this.loginForm.get('email');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getEmailError(control);
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
