interface NextCourseDto {
  name: string;
  date: string;
  tag: TagDto;
  dog: string;
  description: string;
}

interface NextReservedCardCourseDto {
  id: number;
  name: string;
  date: string;
  tag: TagDto;
  coach: CoachDto;
}
