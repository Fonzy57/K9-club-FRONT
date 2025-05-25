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
