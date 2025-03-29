import { Tag } from '../../tag-name/tag-name.type';

// TODO DUPLICATION AVEC CARDCOURSE
// VOIR POUR FAIRE UN SEUL TYPE AVEC UN SEUL COMPOSANT ET DES CONDITIONS
// SI LA DESCRIPTION EST LES PLACES SONT DEFINIS ON N'AFFICHE PAS TOUT
export interface ReservedCardCourse {
  name: string;
  date: string;
  tag: Tag;
  coach: string;
}
