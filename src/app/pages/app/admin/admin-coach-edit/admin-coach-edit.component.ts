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
import { k9Config } from '@config/global';

/**
 * AdminCoachEditComponent
 *
 * This standalone component handles editing an existing coach.
 * - It initializes a reactive form with fields: firstname, lastname, email.
 * - On init, it fetches coach data by ID (if present) and patches the form.
 * - On submit, it validates the form, sends a PUT request, and shows toast feedback.
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
  templateUrl: './admin-coach-edit.component.html',
})
export class AdminCoachEditComponent implements OnInit {
  AppRoutes = AppRoutes;
  displayErrors = false;
  disableButton = true;

  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  toastService: ToastMessageService = inject(ToastMessageService);

  /** True if URL has an `id` parameter, indicating edit mode */
  isEdit = !!this.activatedRoute.snapshot.paramMap.get('id');

  /** Holds the coach data loaded from the backend */
  coachToEdit: CoachAdmin = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    createdAt: '',
    updatedAt: '',
  };

  /**
   * Reactive form definition:
   * - firstname: required, length 3–100, no whitespace-only
   * - lastname: same rules as firstname
   * - email: required, valid email pattern
   */
  editForm = this.formBuilder.group({
    firstname: ['', FormValidators.nameValidator()],
    lastname: ['', FormValidators.nameValidator()],
    email: ['', FormValidators.emailValidator()],
  });

  /**
   * On component initialization:
   * - If an ID is present in the route, fetch coach data via GET
   * - Patch the form with the retrieved values
   * - Store the coach object in `coachToEdit`
   */
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // If there is an ID in URL we fill the form
    if (id) {
      this.http.get<CoachAdmin>(`${k9Config.apiRoot}/coach/${id}`).subscribe({
        next: (coach) => {
          this.editForm.patchValue(coach);
          this.coachToEdit = coach;
        },
        error: (error) => {
          console.error('ERROR editing coach', error);
          this.toastService.show({
            severity: 'error',
            title: 'Erreur avec les données',
            content:
              'Il y a eu un problème lors de la récupération des données 😢 veuillez réessayer plus tard.',
            sticky: true,
          });
        },
      });
    }
  }

  /**
   * Handles the form submission for editing a coach.
   * - Marks all fields touched and shows errors if the form is invalid.
   * - Sends a PUT request to update the coach if valid.
   * - Displays success or error toasts based on server response.
   */
  onClick() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      this.disableButton = true;
      return;
    }

    const formValueTrimed: CoachEditProps = {
      firstname: this.editForm.value.firstname!.trim(),
      lastname: this.editForm.value.lastname!.trim(),
      email: this.editForm.value.email!.trim(),
    };

    // Checking if editing, if true API call whit PUT method
    // TODO DEMANDER A FRANCK SI ADMIN CHANGE LE MAIL D'UN COACH,
    // COMMENT FAIRE POUR DECONNECTER CE COACH AUTOMATIQUEMENT
    if (this.coachToEdit) {
      this.http
        .put<CoachAdmin>(
          `${k9Config.apiRoot}/coach/${this.coachToEdit.id}`,
          formValueTrimed
        )
        .subscribe({
          next: () => {
            this.toastService.show({
              severity: 'success',
              title: 'Modification réussie',
              content: 'Les informations du coach ont bien été modifié',
              time: 3000,
            });

            this.router.navigateByUrl(AppRoutes.app.admin.coachesFull);
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
  }

  /** Reset the error display flag whenever a form field value changes */
  onFieldChange() {
    this.displayErrors = false;
    this.disableButton = false;
  }

  get hasChanges(): boolean {
    const { firstname, lastname, email } = this.editForm.value;
    return (
      firstname?.trim() !== this.coachToEdit.firstname ||
      lastname?.trim() !== this.coachToEdit.lastname ||
      email?.trim() !== this.coachToEdit.email
    );
  }

  /**
   * Returns the validation error message for the 'firstname' control,
   * or an empty string if the control is valid or untouched.
   */
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

  /**
   * Returns the validation error message for the 'lastname' control,
   * or an empty string if the control is valid or untouched.
   */
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

  /**
   * Returns the validation error message for the 'email' control,
   * or an empty string if the control is valid or untouched.
   */
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
