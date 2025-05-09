// ANGULAR
import { Component, Input } from '@angular/core';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { TagNameComponent } from '@components/tag-name/tag-name.component';

// TYPES
import { ReservedCardCourse } from './card-reserved-course.type';

@Component({
  selector: 'app-card-reserved-course',
  imports: [ButtonComponent, TagNameComponent],
  templateUrl: './card-reserved-course.component.html',
})
export class CardReservedCourseComponent {
  @Input() course!: ReservedCardCourse;
}
