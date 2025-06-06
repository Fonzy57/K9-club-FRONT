// ANGULAR
import { Component, inject } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { Observable } from "rxjs";

// PRIME NG
import { DatePickerModule } from "primeng/datepicker";
import { SelectModule } from "primeng/select";
import { TabsModule } from "primeng/tabs";
import { ButtonModule } from "primeng/button";

// COMPONENTS
import { ButtonComponent } from "@components/button/button.component";

// SERVICES
import { UserInfoService } from "@services/user/user-info.service";
import { DogService } from "@services/user/dog.service";

// CONFIG
import { AppRoutes } from "@config/routes";

// TYPES
import { DogAvatarDto } from "@models/dog/dog-avatar";

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
    DatePickerModule,
    SelectModule,
    TabsModule,
    DatePipe,
    ButtonModule,
    ButtonComponent,
  ],
  templateUrl: "./dog.component.html",
})
export class DogComponent {
  AppRoutes = AppRoutes;
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

    /* TODO SUPPRIMER APRES TESTS */
    this.dogs$.subscribe({
      next: (response) => {
        console.log("response : ", response);
        return response;
      },
    });
  }
}
