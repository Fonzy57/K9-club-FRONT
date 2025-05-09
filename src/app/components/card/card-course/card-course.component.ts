// ANGULAR
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { TagNameComponent } from '@components/tag-name/tag-name.component';

// TYPES
import { CardCourse } from './card-course.type';

@Component({
  selector: 'app-card-course',
  imports: [ButtonComponent, TagNameComponent, NgClass],
  templateUrl: './card-course.component.html',
})
export class CardCourseComponent {
  @Input() course!: CardCourse;

  get placesColor(): string {
    const placesAvailableInPercent = this.course.places / this.course.maxPlaces;

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
