// ANGULAR
import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, take } from "rxjs";

// COMPONENTS
import { CustomInputComponent } from "@components/custom-input/custom-input.component";
import { ButtonComponent } from "@components/button/button.component";
import { BackButtonComponent } from "@components/back-button/back-button.component";
import { CardWrapperComponent } from "@components/card/card-wrapper/card-wrapper.component";

// SERVICES
import { AuthService } from "@services/auth/auth.service";
import { UserInfoService } from "@services/user/user-info.service";
import { ToastMessageService } from "@services/toast/toast-message.service";

// CONFIG
import { AppRoutes } from "@config/routes";
import { k9Config } from "@config/global";

// VALIDATORS
import { FormValidators } from "app/validators/form-validators";

@Component({
  selector: "app-user-account",
  imports: [
    CustomInputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    BackButtonComponent,
    CardWrapperComponent,
  ],
  templateUrl: "./user-account.component.html",
})
export class UserAccountComponent {
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

  /* TODO FAIRE LE BON TYPAGE */
  userToEdit: any = {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
  };

  editUserForm = this.formBuilder.group({
    firstname: ["", FormValidators.nameValidator()],
    lastname: ["", FormValidators.nameValidator()],
    email: ["", FormValidators.emailValidator()],
  });

  ngOnInit() {
    // Déclenche la récupération des infos (remplit le BehaviorSubject)
    this.userInfoService.getUserInfos();

    this.userInfoService.user$
      .pipe(
        filter((user) => !!user), // ou user && user.id
        take(1)
      )
      .subscribe((user) => {
        this.editUserForm.patchValue(user);
        this.userToEdit = user;
      });
  }

  onClick() {
    if (this.editUserForm.invalid) {
      // Afficher les erreurs à la soumission
      this.editUserForm.markAllAsTouched();
      this.displayErrors = true;
      this.disableButton = true;
      return;
    }

    const formValueTrimed: CoachEditProps = {
      firstname: this.editUserForm.value.firstname!.trim(),
      lastname: this.editUserForm.value.lastname!.trim(),
      email: this.editUserForm.value.email!.trim(),
    };

    // Checking if email has changed
    const emailChanged = formValueTrimed.email !== this.userToEdit.email;

    this.http
      .put<CoachAdmin>(
        `${k9Config.apiRoot}/owner/${this.userToEdit.id}`,
        formValueTrimed
      )
      .subscribe({
        next: () => {
          if (emailChanged) {
            this.toastService.show({
              severity: "success",
              title: "Modification réussie",
              content:
                "Vos informations ont bien été modifié, merci de vous reconnecter",
              time: 3000,
            });

            // if email has changed we logout the user
            this.auth.logout();
          } else {
            this.disableButton = true;

            this.toastService.show({
              severity: "success",
              title: "Modification réussie",
              content: "Vos informations ont bien été modifié",
              time: 3000,
            });
          }
        },
        error: () => {
          this.toastService.show({
            severity: "error",
            title: "Modification échouée",
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
    const { firstname, lastname, email } = this.editUserForm.value;
    return (
      firstname?.trim() !== this.userToEdit.firstname ||
      lastname?.trim() !== this.userToEdit.lastname ||
      email?.trim() !== this.userToEdit.email
    );
  }

  get firstnameError() {
    const control = this.editUserForm.get("firstname");

    if (!control) {
      return "";
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, "prénom");
    }

    return "";
  }

  get lastnameError() {
    const control = this.editUserForm.get("lastname");

    if (!control) {
      return "";
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, "nom");
    }

    return "";
  }

  get emailError() {
    const control = this.editUserForm.get("email");

    if (!control) {
      return "";
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getEmailError(control);
    }

    return "";
  }
}
