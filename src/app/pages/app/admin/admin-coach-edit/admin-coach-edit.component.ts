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

  /* ---------------------------------------------------- */
  /* 
    TODO IL FAUT QUE JE TRIM CHAQUE VALEUR DU FORMULAIRE
  */
  /* ---------------------------------------------------- */
  editForm = this.formBuilder.group({
    firstname: ['', FormValidators.nameValidator()],
    lastname: ['', FormValidators.nameValidator()],
    email: ['', FormValidators.emailValidator()],
  });

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // If there is an ID in URL we fill the form
    if (id) {
      this.http.get<CoachAdmin>(`${apiRoot}/coach/${id}`).subscribe({
        next: (coach) => {
          this.editForm.patchValue(coach);
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
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    } else {
      // Checking if editing, if true API call whit PUT method
      if (this.coachToEdit) {
        this.http
          .put<CoachAdmin>(
            `${apiRoot}/coach/${this.coachToEdit.id}`,
            this.editForm.value
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
      }

      // TODO FAIRE UNE REDIRECTION VERS LA PAGE COACHS
    }
  }

  onFieldChange() {
    this.displayErrors = false;
  }

  get firstnameError() {
    const control = this.editForm.get('firstname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'prénom');
    }

    return '';
  }

  get lastnameError() {
    const control = this.editForm.get('lastname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'nom');
    }

    return '';
  }

  get emailError() {
    const control = this.editForm.get('email');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getEmailError(control);
    }

    return '';
  }
}
