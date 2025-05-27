// ANGULAR
import { CommonModule, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

// COMPONENTS
import { CardDogComponent } from '@components/card/card-dog/card-dog.component';
import { CardNextCourseComponent } from '@components/card/card-next-course/card-next-course.component';

// SERVICES
import { UserInfoService } from '@services/user/user-info.service';
import { DogService } from '@services/user/dog.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardDogComponent,
    CardNextCourseComponent,
    TitleCasePipe,
    UpperCasePipe,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
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

    this.nextCourses$ = this.dogs$.pipe(
      map((dogs) => this.computeNextCourses(dogs))
    );
  }

  private computeNextCourses(dogs: any[]): NextCourseDto[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let upcomingCourses: NextCourseDto[] = [];

    dogs.forEach((dog: DogDto) => {
      if (!dog.registrations || dog.registrations.length === 0) {
        // Rien à faire, on skip ce chien
        return;
      }

      dog.registrations
        .filter((registration: CourseRegistrationDto) => {
          const courseDate = new Date(registration.course.startDate);
          return courseDate >= today && registration.status === 'CONFIRMED';
        })
        .forEach((registration: CourseRegistrationDto) => {
          upcomingCourses.push({
            name: registration.course.name,
            date: registration.course.startDate,
            tag: registration.course.courseType,
            description: registration.course.description,
            dog: dog.name,
          });
        });
    });

    upcomingCourses = upcomingCourses.sort(
      (a: NextCourseDto, b: NextCourseDto) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    );

    return upcomingCourses.slice(0, 6);
  }
}
