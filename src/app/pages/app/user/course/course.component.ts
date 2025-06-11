// ANGULAR
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { map, Observable, BehaviorSubject, combineLatest } from "rxjs";
import { FormsModule } from "@angular/forms";
/* TODO REVOIR LES ANIMATIONS PLUS TARD */
/* import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations"; */

// COMPONENTS
import { CardCourseComponent } from "@components/card/card-course/card-course.component";
import { CardReservedCourseComponent } from "@components/card/card-reserved-course/card-reserved-course.component";
import { ButtonComponent } from "@components/button/button.component";
import { TagNameComponent } from "@components/tag-name/tag-name.component";
import { CardEmptyCourseComponent } from "@components/card/card-empty-course/card-empty-course.component";
import { CardEmptyReservedCourseComponent } from "@components/card/card-empty-reserved-course/card-empty-reserved-course.component";

// PRIME NG
import { SelectModule } from "primeng/select";

// SERVICES
import { DogService } from "@services/user/dog.service";
import { CourseTypeService } from "@services/course-type/course-type.service";
import { CoursesService } from "@services/courses/courses.service";
import { ToastMessageService } from "@services/toast/toast-message.service";

@Component({
  selector: "app-course",
  imports: [
    CardCourseComponent,
    CardReservedCourseComponent,
    ButtonComponent,
    CommonModule,
    FormsModule,
    SelectModule,
    TagNameComponent,
    CardEmptyCourseComponent,
    CardEmptyReservedCourseComponent,
  ],
  templateUrl: "./course.component.html",
  /* TODO REVOIR LES ANIMATIONS PLUS TARD */
  /* animations: [
    trigger("expandCollapse", [
      state(
        "collapsed",
        style({
          maxHeight: "470px", // même valeur que max-h-[470px]
          overflow: "hidden",
        })
      ),
      state(
        "expanded",
        style({
          maxHeight: "*", // auto
          overflow: "visible",
        })
      ),
      transition("collapsed <=> expanded", [animate("300ms ease-in-out")]),
    ]),
    trigger("fadeOverlay", [
      state("visible", style({ opacity: 1 })),
      state("hidden", style({ opacity: 0 })),
      transition("hidden => visible", [animate("400ms ease-in")]),
      transition("visible => hidden", [animate("200ms ease-out")]),
    ]),
  ], */
})
export class CourseComponent {
  dogService: DogService = inject(DogService);
  courseTypeService: CourseTypeService = inject(CourseTypeService);
  courseService: CoursesService = inject(CoursesService);
  toastService: ToastMessageService = inject(ToastMessageService);

  // Observable streams for data
  dogs$!: Observable<DogDto[]>;
  selectedDog$ = new BehaviorSubject<DogDto | undefined>(undefined);

  courseTypes$!: Observable<CourseTypeDto[]>;
  selectedCourseType$ = new BehaviorSubject<CourseTypeDto | undefined>(
    undefined
  );

  courses$!: Observable<CourseDto[]>;

  // Used for ngModel selection in templates
  selectedDog: DogDto | undefined;
  selectedCourseType: CourseTypeDto | undefined;

  // Stores the next three reserved courses for the selected dog
  nextCoursesReservedForSelectedDog: NextReservedCardCourseDto[] = [];

  totalReservedCoursesCount: number = 0;

  // Stream of available courses filtered according to dog/dog age/type selection
  nextCoursesAvailable$!: Observable<CourseDto[]>;

  showAllCourses = false;
  showAllReservedCourses = false;

  toggleShowAllCourses() {
    this.showAllCourses = !this.showAllCourses;
  }

  toggleShowAllReservedCourses() {
    this.showAllReservedCourses = !this.showAllReservedCourses;
  }

  ngOnInit() {
    // --- Fetch all data streams from services ---
    this.dogService.getAllDogs();
    this.dogs$ = this.dogService.dogs$;

    this.courseTypeService.getAllCourseTypes();
    this.courseTypes$ = this.courseTypeService.courseTypes$;

    this.courseService.getAllCourse();
    this.courses$ = this.courseService.courses$;

    // --- Select first dog by default when data arrives, and update reserved courses ---
    this.dogs$.subscribe((dogs) => {
      if (dogs && dogs.length > 0) {
        this.selectedDog = dogs[0];
        this.selectedDog$.next(dogs[0]);
        this.nextCoursesReservedForSelectedDog =
          this.getNextReservedCoursesForDog(dogs[0]);
      }
    });

    // --- Combine latest value of courses, selected dog, and selected type to filter available courses reactively ---
    this.nextCoursesAvailable$ = combineLatest([
      this.courses$,
      this.selectedDog$,
      this.selectedCourseType$,
    ]).pipe(
      map(([courses, selectedDog, selectedCourseType]) =>
        this.getNextCoursesAvailable(
          courses,
          6,
          selectedDog,
          selectedCourseType
        )
      )
    );
  }

  onReserveCourse(course: any) {
    console.log("Dans la page : ", course);
    if (!this.selectedDog) {
      this.toastService.show({
        severity: "error",
        title: "Réservation d'un cours",
        content: "Veuillez selectionner un chien avant de réserver un cours.",
        sticky: true,
      });
      return;
    }

    const dto: any = {
      dogId: this.selectedDog.id,
      courseId: course.id,
      status: "CONFIRMED",
    };

    this.courseService.registerCourse(dto).subscribe({
      next: (saved) => {
        // 1) Recharger la liste des cours
        this.courseService.getAllCourse();
        // 2) Recharger la liste des dogs (pour récupérer la nouvelle registration)
        this.dogService.getAllDogs();

        this.toastService.show({
          severity: "success",
          title: "Réservation réussie",
          content: `Le cours ${course.name} a bien été réservé pour ${this.selectedDog?.name}.`,
        });
      },
      error: (error) => {
        console.error("Erreur réservation", error);
        this.toastService.show({
          severity: "error",
          title: "Réservation d'un cours",
          content: "Il y a eu une erreur lors de la réservation du cours.",
          sticky: true,
        });
      },
    });
  }

  // --- Update reserved courses and observable when changing dog selection ---
  onSelectDogChange() {
    if (this.selectedDog) {
      this.nextCoursesReservedForSelectedDog =
        this.getNextReservedCoursesForDog(this.selectedDog);
      this.selectedDog$.next(this.selectedDog);
    } else {
      this.nextCoursesReservedForSelectedDog = [];
      this.selectedDog$.next(undefined);
    }
  }

  // --- Update course type observable when changing type selection ---
  onSelectCourseTypeChange() {
    this.selectedCourseType$.next(this.selectedCourseType);
  }

  /**
   * Get the next 3 reserved courses for the given dog (future, confirmed only)
   * @param dog The selected dog
   * @param max Maximum number of courses to return (default: 3)
   */
  getNextReservedCoursesForDog(
    dog: DogDto,
    max: number = 3
  ): NextReservedCardCourseDto[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!dog.registrations || dog.registrations.length === 0) {
      return [];
    }

    // Filter registrations: only confirmed and in the future
    const upcomingReservedCoursesFiltered = dog.registrations
      .filter((registration: CourseRegistrationDto) => {
        const courseDate = new Date(registration.course.startDate);
        return courseDate >= today && registration.status === "CONFIRMED";
      })
      .map((registration: CourseRegistrationDto) => ({
        name: registration.course.name,
        date: registration.course.startDate,
        tag: registration.course.courseType,
        coach: registration.course.coach,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Update total registrations number
    this.totalReservedCoursesCount = upcomingReservedCoursesFiltered.length;

    return upcomingReservedCoursesFiltered /* .slice(0, max) */;
  }

  /**
   * Get the next available courses for the selected dog, filtered by type and dog's age
   * Excludes courses already reserved by the dog (confirmed or pending)
   * @param courses List of all courses
   * @param max Max number of results
   * @param selectedDog Selected dog for filtering (required)
   * @param selectedCourseType Optionally filter by selected course type
   */
  getNextCoursesAvailable(
    courses: CourseDto[],
    max: number,
    selectedDog?: DogDto,
    selectedCourseType?: CourseTypeDto
  ): CourseDto[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!courses || courses.length === 0 || !selectedDog) {
      return [];
    }

    // Compute dog's age in years (for age range filtering)
    const dogBirthdate = new Date(selectedDog.birthdate);
    const ageMs = today.getTime() - dogBirthdate.getTime();
    const dogAge = ageMs / (1000 * 60 * 60 * 24 * 365.25);

    const upcomingCourses = courses
      .filter((course: CourseDto) => {
        const courseDate = new Date(course.startDate);

        // Only future courses
        if (courseDate < today) {
          return false;
        }
        const minAge = course.ageRange.minAge;
        const maxAge = course.ageRange.maxAge;

        // Dog's age must fit the course's age range
        if (dogAge < minAge || dogAge > maxAge) {
          return false;
        }

        // If a type is selected, must match
        if (
          selectedCourseType &&
          course.courseType.id !== selectedCourseType.id
        ) {
          return false;
        }

        // Exclude courses already reserved or pending for this dog
        const alreadyHasARegistration = course.registrations.some(
          (registration: any) =>
            registration.dog?.id === selectedDog.id &&
            (registration.status === "CONFIRMED" ||
              registration.status === "PENDING")
        );
        if (alreadyHasARegistration) {
          return false;
        }

        return true;
      })
      // Sort by start date ascending
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    /* .slice(0, max) */ return upcomingCourses;
  }
}
