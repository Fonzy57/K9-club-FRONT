// ANGULAR
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

// COMPONENTS
import { CardCourseComponent } from '@components/card/card-course/card-course.component';
import { CardReservedCourseComponent } from '@components/card/card-reserved-course/card-reserved-course.component';
import { ButtonComponent } from '@components/button/button.component';
import { TagNameComponent } from '@components/tag-name/tag-name.component';

// PRIME NG
import { SelectModule } from 'primeng/select';

// SERVICES
import { DogService } from '@services/user/dog.service';
import { CourseTypeService } from '@services/course-type/course-type.service';
import { CoursesService } from '@services/courses/courses.service';

@Component({
  selector: 'app-course',
  imports: [
    CardCourseComponent,
    CardReservedCourseComponent,
    ButtonComponent,
    CommonModule,
    FormsModule,
    SelectModule,
    TagNameComponent,
  ],
  templateUrl: './course.component.html',
})
export class CourseComponent {
  dogService: DogService = inject(DogService);
  courseTypeService: CourseTypeService = inject(CourseTypeService);
  courseService: CoursesService = inject(CoursesService);

  dogs$!: Observable<DogDto[]>;
  selectedDog: DogDto | undefined;

  courseTypes$!: Observable<CourseTypeDto[]>;
  selectedCourseType: CourseTypeDto | undefined;

  courses$!: Observable<CourseDto[]>;
  nextCoursesAvailable$!: Observable<CourseDto[]>;

  nextCoursesReservedForSelectedDog: NextReservedCardCourseDto[] = [];

  ngOnInit() {
    // Get all dogs from owner
    this.dogService.getAllDogs();
    this.dogs$ = this.dogService.dogs$;

    // Get all course types
    this.courseTypeService.getAllCourseTypes();
    this.courseTypes$ = this.courseTypeService.courseTypes$;

    // Get all courses
    this.courseService.getAllCourse();
    this.courses$ = this.courseService.courses$;
    // Filter courses
    this.nextCoursesAvailable$ = this.courses$.pipe(
      map((courses) => this.getNextCoursesAvailable(courses, 6))
    );

    this.dogs$.subscribe((dogs) => {
      if (dogs && dogs.length > 0) {
        this.selectedDog = dogs[0];
        this.nextCoursesReservedForSelectedDog =
          this.getNextReservedCoursesForDog(dogs[0]);
      }
    });
  }

  onSelectDogChange() {
    if (this.selectedDog) {
      this.nextCoursesReservedForSelectedDog =
        this.getNextReservedCoursesForDog(this.selectedDog);
    } else {
      this.nextCoursesReservedForSelectedDog = [];
    }
  }

  onSelectCourseTypeChange() {
    console.log('selected course type : ', this.selectedCourseType);
    // TODO ICI FILTRER LES COURS
  }

  // TODO REFACTORISER POUR AVOIR UNE SEULE FONCTION QUI TRIE SELON LA DATE,
  // IL FAUT QUE JE PUISSE PASSER UN TABLEAU OU JUSTE UN ELEMENT
  getNextReservedCoursesForDog(
    dog: DogDto,
    max: number = 3
  ): NextReservedCardCourseDto[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!dog.registrations || dog.registrations.length === 0) {
      return [];
    }

    const upcomingReservedCourses = dog.registrations
      .filter((registration: CourseRegistrationDto) => {
        const courseDate = new Date(registration.course.startDate);
        return courseDate >= today && registration.status === 'CONFIRMED';
      })
      .map((registration: CourseRegistrationDto) => ({
        name: registration.course.name,
        date: registration.course.startDate,
        tag: registration.course.courseType,
        coach: registration.course.coach,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, max);

    return upcomingReservedCourses;
  }

  getNextCoursesAvailable(courses: CourseDto[], max: number): any[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!courses || courses.length === 0) {
      return [];
    }

    const upcomingCourses = courses
      .filter((courses: CourseDto) => {
        const courseDate = new Date(courses.startDate);
        return courseDate >= today;
      })
      /* .map((courses: CourseDto) => ({
        name: courses.name,
        date: courses.startDate,
        tag: courses.courseType,
        coach: courses.coach,
      })) */
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
      .slice(0, max);

    return upcomingCourses;
  }
}
