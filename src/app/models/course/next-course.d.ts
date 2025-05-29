interface NextCourseDto {
  name: string;
  date: string;
  tag: TagDto;
  dog: string;
  description: string;
}

interface NextReservedCardCourse {
  name: string;
  date: string;
  tag: TagDto;
  coach: CoachDto;
}
