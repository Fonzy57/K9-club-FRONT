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
  styleUrl: './admin-coach-add.component.css',
})
export class AdminCoachAddComponent {
  AppRoutes = AppRoutes;
  displayErrors = false;

  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  toastService: ToastMessageService = inject(ToastMessageService);
  isEdit = !!this.activatedRoute.snapshot.paramMap.get('id');

  coachToEdit: CoachAdmin | null = null;

  /* ---------------------------------------------------- */
  /* 
    TODO IL FAUT QUE JE TRIM CHAQUE VALEUR DU FORMULAIRE
  */
  /* ---------------------------------------------------- */
  addForm = this.formBuilder.group({
    firstname: ['', FormValidators.nameValidator()],
    lastname: ['', FormValidators.nameValidator()],
    email: ['', FormValidators.emailValidator()],
    password: ['', FormValidators.passwordValidator()],
  });

  onClick() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    } else {
      // We add a new coach
      /*

          TODO GERER L'AJOUT D'UN COACH, FAIRE LA VERIFICATION DE L'EMAIL BIEN UNIQUE

          GERER CA AU NIVEAU DE L'API ET RENOYER UN MESSAGE CLAIR

          TODO TESTER SI TOUT FONCTIONNE BIEN

        */
      this.http
        .post<CoachAdmin>(`${apiRoot}/coach`, this.addForm.value)
        .subscribe({
          next: () => {
            const lastname = this.addForm.value.lastname;
            const firstname = this.addForm.value.firstname;
            this.toastService.show({
              severity: 'success',
              title: 'Ajout réussi',
              content: `Le coach ${firstname} ${lastname} a bien été ajouté`,
              time: 3000,
            });
          },
          error: () => {
            this.toastService.show({
              severity: 'error',
              title: 'Ajout échoué',
              content: `Le coach n'a pas été ajouté`,
              sticky: true,
            });
          },
        });

      // TODO FAIRE UNE REDIRECTION VERS LA PAGE COACHS
    }
  }

  onFieldChange() {
    this.displayErrors = false;
  }

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

  /** Valeur brute du mot de passe */
  get passwordValue(): string {
    return this.addForm.get('password')?.value || '';
  }

  /** Critères de mot de passe */
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
  }
}
