// ANGULAR
import { Component, inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { RouterLink } from "@angular/router";

// PRIME NG
import { DatePickerModule } from "primeng/datepicker";
import { SelectModule } from "primeng/select";
import { TabsModule } from "primeng/tabs";
import { ButtonModule } from "primeng/button";

// COMPONENTS
import { ButtonComponent } from "@components/button/button.component";
import { CardEmptyDogComponent } from "@components/card/card-empty-dog/card-empty-dog.component";
import { CustomIconComponent } from "@components/custom-icon/custom-icon.component";

// SERVICES
import { UserInfoService } from "@services/user/user-info.service";
import { DogService } from "@services/user/dog.service";

// PIPES
import { AgePipe } from "app/pipes/age.pipe";

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
    CardEmptyDogComponent,
    CustomIconComponent,
    RouterLink,
    AgePipe,
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
  }

  daysToNextBirthday(birthdate: string): number {
    const birthday = new Date(birthdate);

    const today = new Date();

    // Create next birthday date for current year
    const nextBirthday = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate()
    );

    // If this year's birthday has already passed,
    // calculate for next year
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    // Calculate difference in milliseconds
    const diffTime = nextBirthday.getTime() - today.getTime();

    // Convert to days (1 day = 24 * 60 * 60 * 1000 ms)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  onConfirmDelete(dog: any) {
    console.log("Je supprime le chien : ", dog.id, dog.name);
    /* this.confirmationService.confirm({
        header: "Suppression d'un compte",
        message: `${coach.firstname} ${coach.lastname.toUpperCase()}`,
        accept: () => {
          // DELETING THE COACH
          this.onDeleteCoach(coach);
        },
        reject: () => {
          this.toastService.show({
            severity: 'info',
            title: 'Suppression annulée',
            content: `Le compte du coach ${
              coach.firstname
            } ${coach.lastname.toUpperCase()} n'a pas été supprimé.`,
            time: 4000,
          });
        },
      }); */
  }

  /* TODO ICI FONCTION QUE J'AVAIS DANS ADMIN COACH */
  /* onDeleteDog(dog: any) {
      this.http
        .delete<any>(`${k9Config.apiRoot}/coach/${coach.id}`)
        .subscribe({
          next: () => {
            this.coaches = this.coaches.filter((c) => c.id !== coach.id);
  
            this.toastService.show({
              severity: 'success',
              title: 'Coach supprimé',
              content: `Le compte du coach ${
                coach.firstname
              } ${coach.lastname.toUpperCase()} a bien été supprimé.`,
              time: 3000,
            });
          },
          error: (err) => {
            console.error('Erreur lors de la suppression :', err);
            this.toastService.show({
              severity: 'error',
              title: 'Suppression échouée',
              content: `Une erreur est survenue lors de la suppression du coach ${
                coach.firstname
              } ${coach.lastname.toUpperCase()}.`,
              sticky: true,
            });
          },
        });
    } */
}
