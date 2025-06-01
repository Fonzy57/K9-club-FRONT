import { Component, inject } from "@angular/core";
import { CustomInputComponent } from "@components/custom-input/custom-input.component";
import { CardWrapperComponent } from "@components/card/card-wrapper/card-wrapper.component";
import { AppRoutes } from "@config/routes";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastMessageService } from "@services/toast/toast-message.service";
import { FormValidators } from "app/validators/form-validators";
import { k9Config } from "@config/global";
import { ButtonComponent } from "../../../../components/button/button.component";
import { DatePickerModule } from "primeng/datepicker";
import { SelectModule } from "primeng/select";
import { BreedService } from "@services/breed/breed.service";
import { BehaviorSubject, Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { RadioButton } from "primeng/radiobutton";

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
  selectedBreed$ = new BehaviorSubject<BreedDto | undefined>(undefined);

  birthdate: Date | undefined;

  avatars = k9Config.dogAvatars;
  selectedAvatar: any | undefined = undefined;

  genders = k9Config.dogGender;
  selectedGender: any;

  /* TODO GERER LES ERREURS */
  addDogForm = this.formBuilder.group({
    name: [""],
    birthdate: [undefined],
    selectedBreed: [undefined],
    selectedAvatar: [undefined],
    gender: [null],
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
      ownerId: 0, // TODO ici lui passer l'id
    };

    console.log("Form values : ", formValueTrimed);

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

  onSelectBreedChange() {
    console.log("Race change : ", this.selectedBreed$);
  }

  onSelectAvatarChange() {
    console.log("Changement d'avatar : ");
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
