// TODO SUPPRIMMER QUAND L'ENTITEE SERA EN BDD AVEC LA COULEUR
type TagSize = 'normal' | 'tiny';

interface TagDto extends CourseTypeDto {
  size?: TagSize;
}
