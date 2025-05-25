// ANGULAR
import { Component, Input } from '@angular/core';

// COMPONENTS
import { TagNameComponent } from '@components/tag-name/tag-name.component';

@Component({
  selector: 'app-card-next-course',
  imports: [TagNameComponent],
  templateUrl: './card-next-course.component.html',
})
export class CardNextCourseComponent {
  @Input() nextCourse!: any;
}
