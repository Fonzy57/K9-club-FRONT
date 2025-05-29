// ANGULAR
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// PRIME NG
import { PrimeNG } from 'primeng/config';
import { Toast } from 'primeng/toast';

// TODO voir https://angular.dev/guide/animations pour les animations

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'k9-club';

  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);
  }

  /* TODO POUR LES TAGS */
  /*  tagsTiny: Tag[] = [
    { name: 'agility' },
    { name: 'detection' },
    { name: 'basic' },
    { name: 'canicross' },
    { name: 'ring' },
    { name: 'artistic' },
    { name: 'puppy' },
  ];

  tagsNormal: Tag[] = [
    { name: 'agility', size: 'normal', color: 'purple' }, // TODO ICI ON REDEFINI LA COULEUR
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
}
