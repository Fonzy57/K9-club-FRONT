// ANGULAR
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

// COMPONENTS
import { BackButtonComponent } from '@components/back-button/back-button.component';
import { ButtonComponent } from '@components/button/button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';

// VALIDATORS
import { FormValidators } from 'app/validators/form-validators';

// SERVICES
import { ToastMessageService } from '@services/toast/toast-message.service';
import { AuthService } from '@services/auth/auth.service';
import { UserInfoService } from '@services/user/user-info.service';

// CONFIG
import { AppRoutes } from '@config/routes';
import { k9Config } from '@config/global';

@Component({
  selector: 'app-admin-account',
  imports: [
    CustomInputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  templateUrl: './admin-account.component.html',
})
export class AdminAccountComponent {
  AppRoutes = AppRoutes;
  displayErrors = false;
  disableButton = true;

  auth: AuthService = inject(AuthService);
  userInfoService: UserInfoService = inject(UserInfoService);
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  toastService: ToastMessageService = inject(ToastMessageService);

  adminToEdit: AdminEditDto = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    createdAt: '',
    updatedAt: '',
  };

  editAdminForm = this.formBuilder.group({
    firstname: ['', FormValidators.nameValidator()],
    lastname: ['', FormValidators.nameValidator()],
    email: ['', FormValidators.emailValidator()],
  });

  ngOnInit() {
    // Déclenche la récupération des infos (remplit le BehaviorSubject)
    this.userInfoService.getUserInfos();

    this.userInfoService.user$.pipe(take(1)).subscribe((admin) => {
      if (admin && admin.id) {
        this.editAdminForm.patchValue(admin);
        this.adminToEdit = admin;
      }
    });
  }

  onClick() {
    if (this.editAdminForm.invalid) {
      // Afficher les erreurs à la soumission
      this.editAdminForm.markAllAsTouched();
      this.displayErrors = true;
      this.disableButton = true;
      return;
    }

    const formValueTrimed: CoachEditProps = {
      firstname: this.editAdminForm.value.firstname!.trim(),
      lastname: this.editAdminForm.value.lastname!.trim(),
      email: this.editAdminForm.value.email!.trim(),
    };

    // Checking if email has changed
    const emailChanged = formValueTrimed.email !== this.adminToEdit.email;

    this.http
      .put<CoachAdmin>(
        `${k9Config.apiRoot}/admin/${this.adminToEdit.id}`,
        formValueTrimed
      )
      .subscribe({
        next: () => {
          if (emailChanged) {
            this.toastService.show({
              severity: 'success',
              title: 'Modification réussie',
              content:
                'Vos informations ont bien été modifié, merci de vous reconnecter',
              time: 3000,
            });

            // if email has changed we logout the user
            this.auth.logout();
          } else {
            this.disableButton = true;

            this.toastService.show({
              severity: 'success',
              title: 'Modification réussie',
              content: 'Vos informations ont bien été modifié',
              time: 3000,
            });
          }
        },
        error: () => {
          this.toastService.show({
            severity: 'error',
            title: 'Modification échouée',
            content: "Les informations de votre compte n'ont pas été modifié",
            sticky: true,
          });
        },
      });
  }

  /** Reset the error display flag whenever a form field value changes */
  onFieldChange() {
    this.displayErrors = false;
    this.disableButton = false;
  }

  /**
   * Determines whether any of the editable admin fields have been modified.
   *
   * Compares the trimmed values of `firstname`, `lastname`, and `email` from the form
   * against the corresponding properties on the original `adminToEdit` object.
   * Returns `true` if at least one field differs, indicating unsaved changes.
   *
   * @returns `true` if the form values do not match the original admin data; otherwise, `false`.
   */
  get hasChanges(): boolean {
    const { firstname, lastname, email } = this.editAdminForm.value;
    return (
      firstname?.trim() !== this.adminToEdit.firstname ||
      lastname?.trim() !== this.adminToEdit.lastname ||
      email?.trim() !== this.adminToEdit.email
    );
  }

  get firstnameError() {
    const control = this.editAdminForm.get('firstname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'prénom');
    }

    return '';
  }

  get lastnameError() {
    const control = this.editAdminForm.get('lastname');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, 'nom');
    }

    return '';
  }

  get emailError() {
    const control = this.editAdminForm.get('email');

    if (!control) {
      return '';
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getEmailError(control);
    }

    return '';
  }
}
