// ANGULAR
import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";

// PRIME NG
import { DatePickerModule } from "primeng/datepicker";
import { SelectModule } from "primeng/select";
import { RadioButton } from "primeng/radiobutton";

// COMPONENTS
import { CustomInputComponent } from "@components/custom-input/custom-input.component";
import { CardWrapperComponent } from "@components/card/card-wrapper/card-wrapper.component";
import { ButtonComponent } from "@components/button/button.component";

// SERVICES
import { ToastMessageService } from "@services/toast/toast-message.service";
import { BreedService } from "@services/breed/breed.service";

// VALIDATORS
import { FormValidators } from "app/validators/form-validators";

// CONFIG
import { AppRoutes } from "@config/routes";
import { k9Config } from "@config/global";

@Component({
  selector: "app-dog",
  imports: [
    CommonModule,
    CustomInputComponent,
    CardWrapperComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    DatePickerModule,
    SelectModule,
    RadioButton,
  ],
  templateUrl: "./dog.component.html",
})
export class DogComponent {
  AppRoutes = AppRoutes;
  displayErrors = false;

  // Injected services and utilities
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  toastService: ToastMessageService = inject(ToastMessageService);
  breedService: BreedService = inject(BreedService);

  breeds$!: Observable<BreedDto[]>;

  birthdate: Date | undefined;

  avatars = k9Config.dogAvatars;
  selectedAvatar: any | undefined = undefined;

  genders = k9Config.dogGender;
  selectedGender: any;

  addDogForm = this.formBuilder.group({
    name: ["", FormValidators.dogNameValidator()],
    selectedAvatar: [undefined, Validators.required],
    birthdate: [undefined, [Validators.required, FormValidators.notInFuture()]],
    gender: [null, Validators.required],
    selectedBreed: [undefined, Validators.required],
  });

  ngOnInit() {
    this.breedService.getAllBreeds();
    this.breeds$ = this.breedService.breeds$;
  }

  onSubmitDogForm() {
    if (this.addDogForm.invalid) {
      this.addDogForm.markAllAsTouched();
      this.displayErrors = true; // Afficher les erreurs à la soumission
      return;
    }

    const formValueTrimed: any = {
      name: this.addDogForm.value.name!.trim(),
      avatar: this.addDogForm.value.selectedAvatar,
      gender: this.addDogForm.value.gender,
      breed: this.addDogForm.value.selectedBreed,
      // TODO ici lui passer l'id
      ownerId: 0,
    };

    const formValue = this.addDogForm.value;
    console.log("Form values :", formValue);
    console.log("Form values trimed : ", formValueTrimed);

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

  get nameError() {
    const control = this.addDogForm.get("name");
    if (!control) return "";
    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getDogNameError(control);
    }
    return "";
  }

  get avatarError() {
    const control = this.addDogForm.get("selectedAvatar");
    if (!control) return "";
    if ((control.touched || control.dirty) && control.invalid) {
      return "Veuillez sélectionner un avatar.";
    }
    return "";
  }

  get birthdateError() {
    const control = this.addDogForm.get("birthdate");
    if (!control) return "";
    if ((control.touched || control.dirty) && control.invalid) {
      return FormValidators.getBirthdateError(control);
    }
    return "";
  }

  get genderError() {
    const control = this.addDogForm.get("gender");
    if (!control) return "";
    if ((control.touched || control.dirty) && control.invalid) {
      return "Veuillez sélectionner le genre de votre chien.";
    }
    return "";
  }

  get breedError() {
    const control = this.addDogForm.get("selectedBreed");
    if (!control) return "";
    if ((control.touched || control.dirty) && control.invalid) {
      return "Veuillez sélectionner une race.";
    }
    return "";
  }
}
