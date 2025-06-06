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

  selectedDogId: number | string = "";

  nextCourses$!: Observable<NextCourseDto[]>;

  ngOnInit() {
    this.userInfoService.getUserInfos();
    this.user$ = this.userInfoService.user$;

    this.dogService.getAllDogs();
    this.dogs$ = this.dogService.dogs$;

    this.dogs$.subscribe((dogs) => {
      if (dogs && dogs.length > 0) {
        this.selectedDogId = dogs[0].id;
      }
    });
  }

  /**
   * Calcule le nombre de cours déjà passés pour un chien donné
   * Un cours est considéré comme passé s'il est confirmé et que sa date est antérieure à maintenant
   */

  /* TODO VERIFIER ICI LES COURS DEJA RESERVE ET CONFIRMED */
  getCompletedCoursesCount(dog: DogDto): number {
    if (!dog.registrations || dog.registrations.length === 0) {
      return 0;
    }

    const now = new Date();

    return dog.registrations.filter((registration) => {
      // Vérifier que la réservation est confirmée
      const isConfirmed = registration.status.toLowerCase() === "confirmed";

      // Vérifier que la date du cours est passée
      const courseDate = new Date(registration.course.startDate); // Adaptez selon le nom de votre propriété
      const isPast = courseDate < now;

      return isConfirmed && isPast;
    }).length;
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

  /* TODO FAIRE MODAL DE CONFIRMATION DE SUPPRESSION */
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
