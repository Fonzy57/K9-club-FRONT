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

// PRIME NG
import { Checkbox, CheckboxModule } from 'primeng/checkbox';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { BackButtonComponent } from '@components/back-button/back-button.component';

// CONFIG
import { AppRoutes } from '@config/routes';

// VALIDATORS
import { FormValidators } from 'app/validators/form-validators';

// SERVICES
import { AuthService } from '@services/auth/auth.service';
import { ToastMessageService } from '@services/toast/toast-message.service';

@Component({
  selector: 'app-register',
  imports: [
    ButtonComponent,
    CustomInputComponent,
    RouterModule,
    BackButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    Checkbox,
    CheckboxModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  AppRoutes = AppRoutes;
  displayErrors = false;

  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  auth: AuthService = inject(AuthService);
  toast: ToastMessageService = inject(ToastMessageService);

  registrationForm = this.formBuilder.group({
    firstname: ['John', FormValidators.nameValidator()],
    lastname: ['Doe', FormValidators.nameValidator()],
    email: ['john.doe@gmail.com', FormValidators.emailValidator()],
    password: ['motDePasse!57000', FormValidators.passwordValidator()],
    cgv: [false, Validators.requiredTrue],
  });

  onClick() {
    if (this.registrationForm.invalid) {
      // TODO SUPPRIMER QUAND TEST FINIS
      console.log('FORMULAIRE NON VALIDE !');
      console.log('Form PAS trim : ', this.registrationForm.value);

      this.registrationForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    }

    const formValueTrimed: any = {
      firstname: this.registrationForm.value.firstname!.trim(),
      lastname: this.registrationForm.value.lastname!.trim(),
      email: this.registrationForm.value.email!.trim(),
      password: this.registrationForm.value.password!.trim(),
      cgv: this.registrationForm.value.cgv,
    };

    // TODO SUPPRIMER QUAND TEST FINIS
    console.log('Form PAS trim : ', this.registrationForm.value);
    console.log('Form PAS trim SANS VALUE : ', this.registrationForm);
    console.log('Form valeur trim : ', formValueTrimed);
  }

  onFieldChange() {
    this.displayErrors = false;
  }

  // TODO VOIR POUR FAIRE UN PIPE POUR GERER LES ERREURS DE TOUS LES FORMULAIRES
  get firstnameError() {
    const control = this.registrationForm.get('firstname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'prénom');
    }

    return '';
  }

  get lastnameError() {
    const control = this.registrationForm.get('lastname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'nom');
    }

    return '';
  }

  get emailError() {
    const control = this.registrationForm.get('email');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getEmailError(control);
    }

    return '';
  }

  get passwordError() {
    const control = this.registrationForm.get('password');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getPasswordError(control);
    }

    return '';
  }

  get cgvError(): boolean {
    const control = this.registrationForm.get('cgv');
    if (!control) {
      return false;
    }

    if (
      control.touched ||
      this.displayErrors ||
      control.hasError('requiredTrue')
    ) {
      return true;
    }
    return false;
  }

  /* TODO EN DESSOUS SI JAMAIS JE DOIS CHANGER DYNAMIQUEMENT LES ERREURS DU MDP */
  /*  get passwordValue(): string {
    return this.registrationForm.get('password')?.value || '';
  }

  get passMinLength(): boolean {
    return this.passwordValue.length >= 8;
  }

  get passMaxLength(): boolean {
    return this.passwordValue.length <= 40;
  }

  get passHasLower(): boolean {
    return /[a-z]/.test(this.passwordValue);
  }

  get passHasUpper(): boolean {
    return /[A-Z]/.test(this.passwordValue);
  }

  get passHasDigit(): boolean {
    return /\d/.test(this.passwordValue);
  }

  get passHasSpecial(): boolean {
    return /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(this.passwordValue);
  } */
}
