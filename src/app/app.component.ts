import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { TagNameComponent } from './components/tag-name/tag-name.component';
import { Tag } from './components/tag-name/tag-name.type';
import { CardCourseComponent } from './components/card-course/card-course.component';
import { CardCourse } from './components/card-course/card-course.type';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonComponent,
    TagNameComponent,
    CardCourseComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'k9-club';

  handleClickPrimary() {
    console.log('Bouton primary cliqué');
  }

  /* TODO POUR LES TAGS */
  tagsTiny: Tag[] = [
    { name: 'agility' },
    { name: 'detection' },
    { name: 'basic' },
    { name: 'canicross' },
    { name: 'ring' },
    { name: 'artistic' },
    { name: 'puppy' },
  ];

  tagsNormal: Tag[] = [
    { name: 'agility', size: 'normal' },
    { name: 'detection', size: 'normal' },
    { name: 'basic', size: 'normal' },
    { name: 'canicross', size: 'normal' },
    { name: 'ring', size: 'normal' },
    { name: 'artistic', size: 'normal' },
    { name: 'puppy', size: 'normal' },
  ];

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
}
