import { BadgeDTO } from '../../../dto/badge.dto';
import { Tag } from '../../tag-name/tag-name.type';

export interface CardDog {
  image: string;
  name: string;
  race: string;
  age: number;
  nbOfCourses: number;
  nextCourse: string; // TODO CHANGER EN DATE QUAND API OK
  tag: Tag;
  inscriptionDate: string; // TODO CHANGER EN DATE QUAND API OK
  badges: BadgeDTO[];
}
