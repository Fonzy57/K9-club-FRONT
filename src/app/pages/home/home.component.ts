import { Component } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { CopyrightComponent } from '@components/copyright/copyright.component';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, CopyrightComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  courses: Course[] = [
    {
      image: 'course-slalom.jpg',
      title: 'Rappel parfait',
      description:
        'Apprenez à votre chien à revenir immédiatement lorsque vous l’appelez, même en présence de distractions.',
    },
    {
      image: 'course-slalom.jpg',
      title: 'Marche en laisse',
      description:
        'Maîtrisez les techniques pour des promenades agréables sans que votre chien ne tire sur la laisse.',
    },
    {
      image: 'course-slalom.jpg',
      title: 'Focus & Attention',
      description:
        'Développez la capacité de votre chien à rester concentré sur vous en toute circonstance.',
    },
    {
      image: 'course-slalom.jpg',
      title: 'Sociabilité',
      description:
        'Encouragez votre chien à interagir de manière positive avec d’autres chiens et humains.',
    },
    {
      image: 'course-slalom.jpg',
      title: "Initiation à l'agilité",
      description:
        'Découvrez les bases des parcours d’agilité : tunnels, haies et slaloms.',
    },
    {
      image: 'course-slalom.jpg',
      title: 'Canicross & endurance',
      description:
        'Initiez-vous à la course à pied avec votre chien et boostez son endurance.',
    },
    {
      image: 'course-slalom.jpg',
      title: 'Recherche d’objets',
      description:
        'Stimulez l’odorat de votre chien en lui apprenant à retrouver un jouet ou un objet caché.',
    },
    {
      image: 'course-slalom.jpg',
      title: 'Obéissance à distance',
      description:
        'Travaillez sur des ordres exécutés sans contact visuel direct avec votre chien.',
    },
    {
      image: 'course-slalom.jpg',
      title: 'Signaux d’urgence',
      description:
        'Apprenez-lui à réagir en cas de chute, de malaise ou d’événement inhabituel.',
    },
  ];

  coachs: Coach[] = [
    {
      prenom: 'Hubert',
      nom: 'BONISSEUR DE LA BATH',
      specialite: 'Éducation de base & Sociabilisation',
      commentaire:
        'Spécialiste en comportement canin, Hubert accompagne chiots et chiens adultes dans l’apprentissage des ordres de base et la gestion des interactions sociales.',
      image: 'Lucien_Bramare.png',
    },
    {
      prenom: 'Armand',
      nom: 'LESIGNAC',
      specialite: 'Agilité & Sport canin',
      commentaire:
        'Passionné de sports canins, Armand vous guide dans la découverte de l’agility, du canicross et des exercices de coordination pour améliorer la condition physique de votre chien.',
      image: 'Lesignac.png',
    },
    {
      prenom: 'Larmina',
      nom: 'El Akmar Betouche',
      specialite: 'Détection & Pistage',
      commentaire:
        'Experte en flair, Larmina entraîne les chiens à retrouver des objets cachés, suivre des pistes humaines et développer leur odorat de manière ludique et efficace.',
      image: 'Larmina.png',
    },
    {
      prenom: 'Raymond',
      nom: 'PELLETIER',
      specialite: 'Obéissance avancée & réactivité',
      commentaire:
        'Spécialisé dans le dressage avancé, Raymond enseigne aux chiens à répondre aux commandes à distance et à réagir face à des situations d’urgence.',
      image: 'Raymond_Pelletier.png',
    },
    {
      prenom: 'Gerhard',
      nom: 'MOELLER',
      specialite: 'Rééducation & Comportement',
      commentaire:
        'Comportementaliste canin, Gerhard aide les chiens à surmonter leurs peurs, gérer leur stress et améliorer leur patience au quotidien.',
      image: 'Gerhard.png',
    },
  ];
}
