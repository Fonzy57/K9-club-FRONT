interface CourseRegistrationDto {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  course: CourseDto;
}

interface BasicCourseRegistrationDto {
  id: number;
  status: string;
}
