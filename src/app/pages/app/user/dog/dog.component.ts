// ANGULAR
import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BehaviorSubject, Observable } from "rxjs";

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
import { UserInfoService } from "@services/user/user-info.service";
import { DogService } from "@services/user/dog.service";
import { DogAvatarDto } from "@models/dog/dog-avatar";
import { DateUtils } from "app/utils/date.utils";

// TYPES
// Définir l'interface pour le formulaire
interface DogForm {
  name: FormControl<string | null>;
  selectedAvatar: FormControl<DogAvatarDto | null>;
  birthdate: FormControl<Date | null>;
  gender: FormControl<string | null>;
  selectedBreed: FormControl<BreedDto | null>;
}

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
  userInfoService: UserInfoService = inject(UserInfoService);
  dogService: DogService = inject(DogService);

  breeds$!: Observable<BreedDto[]>;
  user$ = new BehaviorSubject<UserInfoDto | null>(null);

  birthdate: Date | undefined;

  avatars = k9Config.dogAvatars;
  selectedAvatar: DogAvatarDto | undefined = undefined;

  genders = k9Config.dogGender;
  selectedGender: any;

  addDogForm: FormGroup<DogForm> = this.formBuilder.group({
    name: new FormControl<string | null>("", FormValidators.dogNameValidator()),
    selectedAvatar: new FormControl<DogAvatarDto | null>(
      null,
      Validators.required
    ),
    birthdate: new FormControl<Date | null>(null, [
      Validators.required,
      FormValidators.notInFuture(),
    ]),
    gender: new FormControl<string | null>(null, Validators.required),
    selectedBreed: new FormControl<BreedDto | null>(null, Validators.required),
  });

  maxDate: Date | undefined;

  ngOnInit() {
    this.breedService.getAllBreeds();
    this.breeds$ = this.breedService.breeds$;

    this.userInfoService.getUserInfos();
    this.user$ = this.userInfoService.user$;

    /* NOT ALLOWING SELECTION AFTER TODAY FOR DATE PICKER*/
    const today = new Date();
    this.maxDate = new Date(today);
  }

  onSubmitDogForm() {
    if (this.addDogForm.invalid) {
      this.addDogForm.markAllAsTouched();
      this.displayErrors = true;
      return;
    }

    const userId = this.userInfoService.user$.getValue()?.id;
    if (!userId) {
      this.toastService.show({
        severity: "error",
        title: "Erreur",
        content: "Impossible de récupérer votre identifiant utilisateur.",
        sticky: true,
      });
      return;
    }

    const formValue = this.addDogForm.value;

    const birthdate = formValue.birthdate
      ? DateUtils.toLocalDateString(formValue.birthdate)
      : "";

    const dogData: AddDogFormDto = {
      name: formValue.name!.trim(),
      avatarUrl: formValue.selectedAvatar!.url,
      birthdate: birthdate,
      gender: formValue.gender!,
      breedId: formValue.selectedBreed!.id,
      ownerId: userId,
    };

    this.dogService.addDog(dogData, userId).subscribe({
      next: (response) => {
        this.toastService.show({
          severity: "success",
          title: "Succès",
          content: "Chien ajouté avec succès!",
        });
        // TODO FAIRE REDIRECTION
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du chien:", error);
        this.toastService.show({
          severity: "error",
          title: "Erreur",
          content: "Erreur lors de l'ajout du chien.",
          sticky: true,
        });
      },
    });
  }

  /** Resets the error display flag when any form field value changes */
  onFieldChange() {
    this.displayErrors = false;
  }

  onSelectDate() {
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
