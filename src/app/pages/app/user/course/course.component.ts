import { Component } from '@angular/core';
import { CardCourseComponent } from '@components/card/card-course/card-course.component';
import { CardCourse } from '@components/card/card-course/card-course.type';
import { CardReservedCourseComponent } from '@components/card/card-reserved-course/card-reserved-course.component';
import { ReservedCardCourse } from '@components/card/card-reserved-course/card-reserved-course.type';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-course',
  imports: [CardCourseComponent, CardReservedCourseComponent, ButtonComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  courses: CardCourse[] = [
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
  ];

  // TODO VOIR POUR FAIRE UNE CONDITION AVEC DES ELEMENTS NON OBLIGATOIRE
  // COMME CA UNE SEULE CARD POUR LE COURS RESERVES OU NON
  reservedCourses: ReservedCardCourse[] = [
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
  ];
}
