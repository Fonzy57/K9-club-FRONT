// ANGULAR
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

// COMPONENTS
import { CardCourseComponent } from '@components/card/card-course/card-course.component';
import { CardCourse } from '@components/card/card-course/card-course.type';
import { CardReservedCourseComponent } from '@components/card/card-reserved-course/card-reserved-course.component';
import { ReservedCardCourse } from '@components/card/card-reserved-course/card-reserved-course.type';
import { ButtonComponent } from '@components/button/button.component';
import { TagNameComponent } from '@components/tag-name/tag-name.component';

// PRIME NG
import { SelectModule } from 'primeng/select';

// SERVICES
import { DogService } from '@services/user/dog.service';
import { CourseTypeService } from '@services/course-type/course-type.service';

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

  dogs$!: Observable<DogDto[]>;
  selectedDog: DogDto | undefined;

  courseTypes$!: Observable<CourseTypeDto[]>;
  selectedCourseType: CourseTypeDto | undefined;

  nextCoursesReservedForSelectedDog: NextReservedCardCourseDto[] = [];

  ngOnInit() {
    // Get all dogs from owner
    this.dogService.getAllDogs();
    this.dogs$ = this.dogService.dogs$;

    this.courseTypeService.getAllCourseTypes();
    this.courseTypes$ = this.courseTypeService.courseTypes$;

    this.dogs$.subscribe((dogs) => {
      if (dogs && dogs.length > 0) {
        this.selectedDog = dogs[0];
        this.nextCoursesReservedForSelectedDog = this.getNextCoursesForDog(
          dogs[0]
        );
      }
    });
  }

  onSelectDogChange() {
    if (this.selectedDog) {
      this.nextCoursesReservedForSelectedDog = this.getNextCoursesForDog(
        this.selectedDog
      );
    } else {
      this.nextCoursesReservedForSelectedDog = [];
    }
  }

  onSelectCourseTypeChange() {
    console.log('selected course type : ', this.selectedCourseType);
    // TODO ICI FILTRER LES COURS
  }

  getNextCoursesForDog(
    dog: DogDto,
    max: number = 3
  ): NextReservedCardCourseDto[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!dog.registrations || dog.registrations.length === 0) {
      return [];
    }

    const upcomingCourses = dog.registrations
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

    return upcomingCourses;
  }
}

/* courses: CardCourse[] = [
    {
      name: 'Franchissement d’obstacles',
      date: '21 octobre 2025 10h30',
      tag: { name: 'agility' },
      coach: 'Armand LESIGNAC',
      places: 8,
      maxPlaces: 10,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Recherche d’objets ou de personne',
      date: '20 avril 2025 9h45',
      tag: { name: 'detection' },
      coach: 'Larmina El Akmar',
      places: 4,
      maxPlaces: 10,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Sociabilité',
      date: '18 juin 2025 14h00',
      tag: { name: 'basic' },
      coach: 'Hubert BONISSEUR DE LA BATH',
      places: 1,
      maxPlaces: 10,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Initiation au matériel',
      date: '17 mars 2025',
      tag: { name: 'canicross' },
      coach: 'Raymond Pelletier',
      places: 6,
      maxPlaces: 10,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
  ]; */
// TODO VOIR POUR FAIRE UNE CONDITION AVEC DES ELEMENTS NON OBLIGATOIRE
// COMME CA UNE SEULE CARD POUR LE COURS RESERVES OU NON
/* reservedCourses: ReservedCardCourse[] = [
    {
      name: 'Franchissement d’obstacles',
      date: '21 octobre 2025 10h30',
      tag: { name: 'agility' },
      coach: 'Armand LESIGNAC',
    },
    {
      name: 'Recherche d’objets ou de personne',
      date: '20 avril 2025 9h45',
      tag: { name: 'detection' },
      coach: 'Larmina El Akmar',
    },
    {
      name: 'Sociabilité',
      date: '18 juin 2025 14h00',
      tag: { name: 'basic' },
      coach: 'Hubert BONISSEUR DE LA BATH',
    },
    {
      name: 'Initiation au matériel',
      date: '17 mars 2025',
      tag: { name: 'canicross' },
      coach: 'Raymond Pelletier',
    },
  ]; */
