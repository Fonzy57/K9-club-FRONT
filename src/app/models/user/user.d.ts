interface OwnerInfoDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  dogs: Dog[];
}

interface OwnerRegistrationDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
