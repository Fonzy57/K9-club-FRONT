import { Component, inject } from "@angular/core";
import { CustomInputComponent } from "@components/custom-input/custom-input.component";
import { CardWrapperComponent } from "@components/card/card-wrapper/card-wrapper.component";
import { AppRoutes } from "@config/routes";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastMessageService } from "@services/toast/toast-message.service";
import { FormValidators } from "app/validators/form-validators";
import { k9Config } from "@config/global";
import { ButtonComponent } from "../../../../components/button/button.component";

@Component({
  selector: "app-dog",
  imports: [
    CustomInputComponent,
    CardWrapperComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: "./dog.component.html",
})
export class DogComponent {
  AppRoutes = AppRoutes;
  displayErrors = false;

  // -------------------------------------------------------------------------------------------------------

  // ----------------------- TODO JE SUIS LA, GERER LE FORMULAIRE D'AJOUT D'UN CHIEN -----------------------

  // -------------------------------------------------------------------------------------------------------

  // Injected services and utilities
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  toastService: ToastMessageService = inject(ToastMessageService);

  addDogForm = this.formBuilder.group({
    name: ["", FormValidators.nameValidator()],
    birthdate: ["", FormValidators.emailValidator()],
    gender: ["", FormValidators.passwordValidator()], // TODO ICI FAIRE UN RADIO BUTTON, CHANGER BOOLEAN DANS BDD ou string
    breed: [""], // Faire un validateur
    avatar: [""], // Faire un validateur
  });

  onClick() {
    if (this.addDogForm.invalid) {
      this.addDogForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    }

    const formValueTrimed: any = {
      name: this.addDogForm.value.name!.trim(),
      birthdate: this.addDogForm.value.birthdate!.trim(),
      gender: this.addDogForm.value.gender!.trim(),
      breed: this.addDogForm.value.breed!.trim(),
      ownerId: 0, // TODO ici lui passer l'id
    };

    // We add a new coach
    /* this.http
      .post<CoachAdmin>(`${k9Config.apiRoot}/coach`, formValueTrimed)
      .subscribe({
        next: () => {
          const lastname = formValueTrimed.lastname;
          const firstname = formValueTrimed.firstname;

          this.toastService.show({
            severity: "success",
            title: "Ajout réussi",
            content: `Le coach ${firstname} ${lastname} a bien été ajouté`,
            time: 3000,
          });

          this.router.navigateByUrl(AppRoutes.app.admin.coachesFull);
        },
        error: (error) => {
          this.toastService.show({
            severity: "error",
            title: "L'ajout a échoué",
            content: error.error,
            sticky: true,
          });
        },
      }); */
  }

  /** Resets the error display flag when any form field value changes */
  onFieldChange() {
    this.displayErrors = false;
  }

  /* TODO REFAIRE LES METHODES POUR AVOIR LES BONNES ERREURS */
  get nameError() {
    const control = this.addDogForm.get("name");

    if (!control) {
      return "";
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getNameError(control, "nom");
    }

    return "";
  }

  get birthdateError() {
    const control = this.addDogForm.get("email");

    if (!control) {
      return "";
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getEmailError(control);
    }

    return "";
  }

  get genderError() {
    const control = this.addDogForm.get("password");

    if (!control) {
      return "";
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getPasswordError(control);
    }

    return "";
  }

  get breedError() {
    const control = this.addDogForm.get("password");

    if (!control) {
      return "";
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getPasswordError(control);
    }

    return "";
  }

  get avatarError() {
    const control = this.addDogForm.get("avatar");

    if (!control) {
      return "";
    }

    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getPasswordError(control);
    }

    return "";
  }
}
