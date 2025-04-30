// ANGULAR
import { Component, Input } from '@angular/core';

// COMPONENTS
import { TagNameComponent } from '@components/tag-name/tag-name.component';
import { NextCourse } from '@pages/app/user/dashboard/dashboard.component';

@Component({
  selector: 'app-card-next-course',
  imports: [TagNameComponent],
  templateUrl: './card-next-course.component.html',
  styleUrl: './card-next-course.component.css',
})
export class CardNextCourseComponent {
  @Input() nextCourse!: NextCourse;
}
