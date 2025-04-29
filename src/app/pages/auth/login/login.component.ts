import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { AppRoutes } from '@config/routes';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

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
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onConnection() {
    // TODO SUPPRIMER LES CONSOLE LOG QUAND TESTS FINIS
    console.log('Je me connecte');
    console.log('Valeur Formulaire : ', this.loginForm.value);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    }
  }

  onFieldChange() {
    this.displayErrors = false;
    console.log('Valeur change');
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
      if (emailControl.errors?.['email']) {
        return 'Veuillez entrer un email valide.';
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
