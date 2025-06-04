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
import { TabsModule } from "primeng/tabs";

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
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    SelectModule,
    TabsModule,
  ],
  templateUrl: "./dog.component.html",
})
export class DogComponent {
  userInfoService: UserInfoService = inject(UserInfoService);
  dogService: DogService = inject(DogService);

  user$!: Observable<UserInfoDto | null>;
  dogs$!: Observable<DogDto[]>;

  nextCourses$!: Observable<NextCourseDto[]>;

  ngOnInit() {
    this.userInfoService.getUserInfos();
    this.dogService.getAllDogs();

    this.user$ = this.userInfoService.user$;
    this.dogs$ = this.dogService.dogs$;
  }
}
