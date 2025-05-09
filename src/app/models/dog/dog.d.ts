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
  name: string;
  breed: BreedDto;
  birthday: string;
  nbOfCourses: number;
  nextCourse: string; // TODO CHANGER EN DATE QUAND API OK
  tag: Tag;
  createdAt: string;
  badges: BadgeDTO[];
}
