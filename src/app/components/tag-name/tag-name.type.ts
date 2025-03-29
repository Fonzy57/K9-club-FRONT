// TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
export type TagSize = 'normal' | 'tiny';

export type TagColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray';

export interface Tag {
  name: string;
  color: TagColor;
  size: TagSize;
}
