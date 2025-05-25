interface CoachDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dogs: DogDto[];
  createdAt: string;
  updatedAt: string;
}

interface CoachAdmin {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface CoachEditProps {
  firstname: string;
  lastname: string;
  email: string;
}

interface CoachAddProps extends CoachEditProps {
  password: string;
}
