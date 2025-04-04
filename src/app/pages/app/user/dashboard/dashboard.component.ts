import { Component } from '@angular/core';
import { CardDogComponent } from '@components/card/card-dog/card-dog.component';
import { CardDog } from '@components/card/card-dog/card-dog.type';
import { CardNextCourseComponent } from '@components/card/card-next-course/card-next-course.component';
import { Tag } from '@components/tag-name/tag-name.type';

/* TODO POUR LES TYPES FAIRE DES FICHIERS DANS LE REPO "models" */
export interface NextCourse {
  name: string;
  date: string;
  tag: Tag;
  description: string;
  dog: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CardDogComponent, CardNextCourseComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  name: string = 'Doe';

  nextCourses: NextCourse[] = [
    {
      name: 'Franchissement d’obstacles',
      date: '21 octobre 2025 10h30',
      tag: { name: 'agility' },
      dog: 'Rex',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Recherche d’objets ou de personne',
      date: '20 avril 2025 9h45',
      tag: { name: 'detection' },
      dog: 'Simba',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Sociabilité',
      date: '18 juin 2025 14h00',
      tag: { name: 'basic' },
      dog: 'Simba',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Initiation au matériel',
      date: '17 mars 2025',
      tag: { name: 'canicross' },
      dog: 'Simba',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
  ];

  dogs: CardDog[] = [
    {
      image: '/images/dogs/rex.png',
      name: 'Rex',
      race: 'Berger allemand',
      age: 5,
      nbOfCourses: 2,
      nextCourse: '25 mars 2025',
      tag: { name: 'agility' },
      inscriptionDate: '17 mars 2024',
      badges: [
        { name: 'best dog', image: '/images/badges/best-dog.png' },
        { name: 'best dog', image: '/images/badges/best-dog.png' },
        { name: 'best dog', image: '/images/badges/best-dog.png' },
      ],
    },
    {
      image: '/images/dogs/simba.png',
      name: 'Simba',
      race: 'Golden Retriver',
      age: 2,
      nbOfCourses: 16,
      nextCourse: '20 avril 2025',
      tag: { name: 'canicross' },
      inscriptionDate: '21 octobre 2024',
      badges: [{ name: 'best dog', image: '/images/badges/best-dog.png' }],
    },
  ];
}
