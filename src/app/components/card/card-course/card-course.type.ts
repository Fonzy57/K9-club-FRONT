import { Tag } from '../../tag-name/tag-name.type';

export interface CardCourse {
  name: string;
  date: string;
  tag: Tag;
  coach: string;
  places: number;
  maxPlaces: number;
  description: string;
}
