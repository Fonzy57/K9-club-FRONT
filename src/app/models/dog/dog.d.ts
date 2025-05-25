interface DogDto {
  id: number;
  name: string;
  birthdate: string;
  gender: string;
  createdAt: string;
  updatedAt: string | null;
  breed: BreedDto;
  registrations: CourseRegistrationDto[];
}

/* TODO REVOIR CE TYPAGE */
interface CardDog {
  name: string;
  breed: BreedDto;
  birthdate: string;
  nbOfCourses: number;
  nextCourse: string; // TODO CHANGER EN DATE QUAND API OK
  tag: Tag;
  createdAt: string;
  badges: BadgeDTO[];
}
