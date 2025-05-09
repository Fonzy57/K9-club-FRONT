interface DogDto {
  id: number;
  name: string;
  birthday: string;
  gender: string;
  createdAt: string;
  updatedAt: string | null;
  breed: BreedDto;
}

/* TODO REVOIR CE TYPAGE */
interface CardDog {
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
