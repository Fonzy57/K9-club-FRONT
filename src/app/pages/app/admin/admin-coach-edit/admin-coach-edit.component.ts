// ANGULAR
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// COMPONENTS
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
  ],
  templateUrl: './admin-coach-edit.component.html',
  styleUrl: './admin-coach-edit.component.css',
})
export class AdminCoachEditComponent implements OnInit {
  AppRoutes = AppRoutes;
  displayErrors = false;

  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  toastService: ToastMessageService = inject(ToastMessageService);
  isEdit = !!this.activatedRoute.snapshot.paramMap.get('id');

  coachToEdit: CoachAdmin | null = null;

  /* TODO IL FAUT QUE JE TRIM CHAQUE VALEUR DU FORMULAIRE */
  AddOrEditForm = this.formBuilder.group({
    firstname: ['', FormValidators.nameValidator()],
    lastname: ['', FormValidators.nameValidator()],
    email: ['', FormValidators.emailValidator()],
    password: ['', FormValidators.passwordValidator()],
  });

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // If there is an ID in URL we fill the form
    if (id) {
      this.http.get<CoachAdmin>(`${apiRoot}/coach/${id}`).subscribe({
        next: (coach) => {
          this.AddOrEditForm.patchValue(coach);
          this.coachToEdit = coach;
        },
        error: (error) => {
          console.error('ERROR editing or adding coach', error);
          this.router.navigate([this.AppRoutes.app.admin.coachesFull]);
        },
      });
    }
  }

  onClick() {
    if (this.AddOrEditForm.invalid) {
      this.AddOrEditForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    } else {
      // Checking if editing, if true API call whit PUT method
      if (this.coachToEdit) {
        this.http
          .put<CoachAdmin>(
            `${apiRoot}/coach/${this.coachToEdit.id}`,
            this.AddOrEditForm.value
          )
          .subscribe({
            next: () => {
              this.toastService.show({
                severity: 'success',
                title: 'Modification réussie',
                content: 'Les informations du coach ont bien été modifié',
                time: 3000,
              });
            },
            error: () => {
              this.toastService.show({
                severity: 'error',
                title: 'Modification échouée',
                content: "Le coach n'a pas été modifié",
                sticky: true,
              });
            },
          });
      } else {
        // We add a new coach
        /*
    TODO GERER L'AJOUT D'UN COACH, FAIRE LA VERIFICATION DE L'EMAIL BIEN UNIQUE
    GERER CA AU NIVEAU DE L'API ET RENOYER UN MESSAGE CLAIR
  */
        this.http
          .post<CoachAdmin>(`${apiRoot}/coach`, this.AddOrEditForm.value)
          .subscribe({
            next: () => {
              const lastname = this.AddOrEditForm.value.lastname;
              const firstname = this.AddOrEditForm.value.firstname;

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
      }

      // TODO FAIRE UNE REDIRECTION VERS LA PAGE COACHS
    }
  }

  onFieldChange() {
    this.displayErrors = false;
  }

  get firstnameError() {
    const control = this.AddOrEditForm.get('firstname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'prénom');
    }

    return '';
  }

  get lastnameError() {
    const control = this.AddOrEditForm.get('lastname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'nom');
    }

    return '';
  }

  get emailError() {
    const control = this.AddOrEditForm.get('email');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getEmailError(control);
    }

    return '';
  }

  get passwordError() {
    const control = this.AddOrEditForm.get('password');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getPasswordError(control);
    }

    return '';
  }
}
