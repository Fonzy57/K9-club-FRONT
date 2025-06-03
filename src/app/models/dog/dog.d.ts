interface DogDto {
  id: number;
  name: string;
  birthdate: string;
  gender: string;
  createdAt: string;
  updatedAt: string | null;
  breed: BreedDto;
  registrations: CourseRegistrationDto[];
  avatarUrl: string;
}

interface AddDogFormDto {
  name: string;
  birthdate: string;
  gender: string;
  avatarUrl: string;
  ownerId: number;
  breedId: number;
}
