// ANGULAR
import { Component, Input } from '@angular/core';
import { DatePipe, LowerCasePipe } from '@angular/common';

// COMPONENTS
import { TagNameComponent } from '@components/tag-name/tag-name.component';

// CUSTOM PIPES
import { AgePipe } from 'app/pipes/age.pipe';

@Component({
  selector: 'app-card-dog',
  imports: [TagNameComponent, LowerCasePipe, AgePipe, DatePipe],
  templateUrl: './card-dog.component.html',
})
export class CardDogComponent {
  /* TODO REVOIR TYPAGE */
  private _dog!: DogDto;

  nbOfCourses: number = 0;
  nextCourseName: string = '-';
  tag: TagDto = {
    id: 0,
    name: '',
    textColor: '',
    backgroundColor: '',
  };

  @Input()
  set dog(value: DogDto) {
    this._dog = value;
    this.computeCoursesInfo();
  }

  get dog() {
    return this._dog;
  }

  computeCoursesInfo() {
    console.log('DOG COMPONENT : ', this._dog);

    if (this._dog.registrations.length === 0) {
      this.nbOfCourses = 0;
      this.nextCourseName = '-';
      this.tag = {
        id: 0,
        name: '',
        textColor: '',
        backgroundColor: '',
      };
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Number of past courses
    const pastCourses = this._dog.registrations.filter(
      (registration: CourseRegistrationDto) => {
        const courseDate = new Date(registration.course.startDate);
        return courseDate < today && registration.status === 'CONFIRMED';
      }
    );

    this.nbOfCourses = pastCourses.length;

    // Next course confirmed
    const nextCourse = this._dog.registrations
      .filter((registration: CourseRegistrationDto) => {
        const courseDate = new Date(registration.course.startDate);
        return courseDate > today && registration.status === 'CONFIRMED';
      })
      .sort((a: CourseRegistrationDto, b: CourseRegistrationDto) => {
        return (
          new Date(a.course.startDate).getTime() -
          new Date(b.course.startDate).getTime()
        );
      });

    if (nextCourse.length > 0) {
      const next = nextCourse[0];

      this.nextCourseName = next.course.name;
      this.tag = {
        ...next.course.courseType,
        size: 'tiny',
      };
    } else {
      this.nextCourseName = '-';
      this.tag = {
        id: 0,
        name: '',
        textColor: '',
        backgroundColor: '',
      };
    }
  }
}
