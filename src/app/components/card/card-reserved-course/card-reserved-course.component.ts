import { Component, Input } from '@angular/core';
import { ReservedCardCourse } from './card-reserved-course.type';
import { ButtonComponent } from '@components/button/button.component';
import { TagNameComponent } from '@components/tag-name/tag-name.component';

@Component({
  selector: 'app-card-reserved-course',
  imports: [ButtonComponent, TagNameComponent],
  templateUrl: './card-reserved-course.component.html',
  styleUrl: './card-reserved-course.component.css',
})
export class CardReservedCourseComponent {
  @Input() course!: ReservedCardCourse;
}
