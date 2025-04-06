import { Component, Input } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { TagNameComponent } from '@components/tag-name/tag-name.component';
import { CardCourse } from './card-course.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-course',
  imports: [ButtonComponent, TagNameComponent, NgClass],
  templateUrl: './card-course.component.html',
  styleUrl: './card-course.component.css',
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
