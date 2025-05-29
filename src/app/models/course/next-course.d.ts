interface NextCourseDto {
  name: string;
  date: string;
  tag: TagDto;
  dog: string;
  description: string;
}

interface NextReservedCardCourseDto {
  name: string;
  date: string;
  tag: TagDto;
  coach: CoachDto;
}
