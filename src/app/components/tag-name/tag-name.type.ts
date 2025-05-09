// TODO SUPPRIMMER QUAND L'ENTITEE SERA EN BDD AVEC LA COULEUR
export type TagSize = 'normal' | 'tiny';

export type TagType =
  | 'agility'
  | 'detection'
  | 'basic'
  | 'canicross'
  | 'ring'
  | 'artistic'
  | 'puppy';

export type TagColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray';

export const TAG_TYPE_COLOR_MAP: Record<TagType, TagColor> = {
  agility: 'orange',
  detection: 'purple',
  basic: 'yellow',
  canicross: 'blue',
  ring: 'red',
  artistic: 'gray',
  puppy: 'green',
};

export const TAG_TYPE_LABEL_MAP: Record<TagType, string> = {
  agility: 'Agilité',
  detection: 'Détection',
  basic: 'Base',
  canicross: 'Canicross',
  ring: 'Ring',
  artistic: 'Artistique',
  puppy: 'Chiot',
};

export interface Tag {
  name: TagType;
  color?: TagColor;
  size?: TagSize;
}
