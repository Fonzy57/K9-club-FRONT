// ANGULAR
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// COMPONENTS
import { BackButtonComponent } from '@components/back-button/back-button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { ButtonComponent } from '@components/button/button.component';

// VALIDATORS
import { FormValidators } from 'app/validators/form-validators';

// SERVICES
import { ToastMessageService } from '@services/toast/toast-message.service';

// CONFIG
import { AppRoutes } from '@config/routes';
import { apiRoot } from '@config/api/api';

/**
 * AdminCoachAddComponent
 *
 * Standalone component responsible for adding a new coach.
 * - Initializes a reactive form with firstname, lastname, email, and password fields.
 * - Applies validation rules via FormValidators.
 * - Submits a POST request to create the coach on valid form submission.
 * - Displays success or error notifications through ToastMessageService.
 */
@Component({
  selector: 'app-admin-coach-edit',
  standalone: true,
  imports: [
    CustomInputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  templateUrl: './admin-coach-add.component.html',
})
export class AdminCoachAddComponent {
  AppRoutes = AppRoutes;
  displayErrors = false;

  // Injected services and utilities
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  toastService: ToastMessageService = inject(ToastMessageService);

  /**
   * Reactive form group definition:
   * - firstname: required, length 3-100, no whitespace-only
   * - lastname: same rules as firstname
   * - email: required, valid email pattern
   * - password: required, length 8-40, contains uppercase, lowercase, digit, special
   */
  addForm = this.formBuilder.group({
    firstname: ['', FormValidators.nameValidator()],
    lastname: ['', FormValidators.nameValidator()],
    email: ['', FormValidators.emailValidator()],
    password: ['', FormValidators.passwordValidator()],
  });

  /**
   * Handles form submission.
   * - Marks all fields as touched and shows errors if form is invalid.
   * - Sends POST request to create a new coach if valid.
   * - Displays toast notifications based on outcome.
   */
  onClick() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    }

    const formValueTrimed: CoachAddProps = {
      firstname: this.addForm.value.firstname!.trim(),
      lastname: this.addForm.value.lastname!.trim(),
      email: this.addForm.value.email!.trim(),
      password: this.addForm.value.password!.trim(),
    };

    // We add a new coach
    this.http.post<CoachAdmin>(`${apiRoot}/coach`, formValueTrimed).subscribe({
      next: () => {
        const lastname = formValueTrimed.lastname;
        const firstname = formValueTrimed.firstname;

        this.toastService.show({
          severity: 'success',
          title: 'Ajout réussi',
          content: `Le coach ${firstname} ${lastname} a bien été ajouté`,
          time: 3000,
        });

        this.router.navigateByUrl(AppRoutes.app.admin.coachesFull);
      },
      error: (error) => {
        this.toastService.show({
          severity: 'error',
          title: "L'ajout a échoué",
          content: error.error,
          sticky: true,
        });
      },
    });
  }

  /** Resets the error display flag when any form field value changes */
  onFieldChange() {
    this.displayErrors = false;
  }

  // TODO VOIR POUR FAIRE UN PIPE POUR GERER LES ERREURS DE TOUS LES FORMULAIRES
  /**
   * Returns the validation error message for the 'firstname' field,
   * or an empty string if the field is valid or untouched.
   */
  get firstnameError() {
    const control = this.addForm.get('firstname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'prénom');
    }

    return '';
  }

  /**
   * Returns the validation error message for the 'lastname' field.
   */
  get lastnameError() {
    const control = this.addForm.get('lastname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'nom');
    }

    return '';
  }

  /**
   * Returns the validation error message for the 'email' field.
   */
  get emailError() {
    const control = this.addForm.get('email');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getEmailError(control);
    }

    return '';
  }

  /**
   * Returns the validation error message for the 'password' field.
   */
  get passwordError() {
    const control = this.addForm.get('password');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getPasswordError(control);
    }

    return '';
  }

  /* TODO EN DESSOUS SI JAMAIS JE DOIS CHANGER DYNAMIQUEMENT LES ERREURS DU MDP */
  /* TODO EN FAIRE UN SERVICE OU UN UTILS */
  /**
   * Retrieves the current raw value of the password field,
   * defaulting to an empty string if undefined.
   */
  /* get passwordValue(): string {
    return this.addForm.get('password')?.value || '';
  } */

  // Password strength criteria getters for real-time UI feedback

  /** True if password length is at least 8 characters */
  /* get passMinLength(): boolean {
    return this.passwordValue.length >= 8;
  } */

  /** True if password length does not exceed 40 characters */
  /* get passMaxLength(): boolean {
    return this.passwordValue.length <= 40;
  } */

  /** True if password contains at least one lowercase letter */
  /* get passHasLower(): boolean {
    return /[a-z]/.test(this.passwordValue);
  } */

  /** True if password contains at least one uppercase letter */
  /* get passHasUpper(): boolean {
    return /[A-Z]/.test(this.passwordValue);
  } */

  /** True if password contains at least one digit */
  /* get passHasDigit(): boolean {
    return /\d/.test(this.passwordValue);
  } */

  /** True if password contains at least one special character */
  /* get passHasSpecial(): boolean {
    return /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(this.passwordValue);
  } */
}
