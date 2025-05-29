// ANGULAR
import { Component, Input } from '@angular/core';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { TagNameComponent } from '@components/tag-name/tag-name.component';

@Component({
  selector: 'app-card-course',
  imports: [
    ButtonComponent,
    TagNameComponent,
    NgClass,
    DatePipe,
    UpperCasePipe,
  ],
  templateUrl: './card-course.component.html',
})
export class CardCourseComponent {
  @Input() course!: CourseDto;

  get reservedPlaces(): number {
    return this.course?.registrations?.length ?? 0;
  }

  get placesColor(): string {
    const placesAvailableInPercent = 0 / this.course.maxParticipants;

    if (placesAvailableInPercent > 0.7) {
      return 'text-error';
    } else if (
      placesAvailableInPercent >= 0.5 &&
      placesAvailableInPercent <= 0.6
    ) {
      return 'text-warning';
    }
    return 'text-success';
  }
}
