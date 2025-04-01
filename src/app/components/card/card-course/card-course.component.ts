import { Component, Input } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { TagNameComponent } from '@components/tag-name/tag-name.component';
import { CardCourse } from './card-course.type';

@Component({
  selector: 'app-card-course',
  imports: [ButtonComponent, TagNameComponent],
  templateUrl: './card-course.component.html',
  styleUrl: './card-course.component.css',
})
export class CardCourseComponent {
  @Input() course!: CardCourse;
}
