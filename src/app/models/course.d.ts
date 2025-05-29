interface CourseDto {
  id: number;
  name: string;
  description: string;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  coach: CoachDto;
  courseType: CourseTypeDto;
  ageRange: AgeRangeDto;
  registrations: BasicCourseRegistrationDto[];
}
