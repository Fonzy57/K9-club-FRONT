// ANGULAR
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DatePipe, UpperCasePipe } from "@angular/common";

// COMPONENTS
import { ButtonComponent } from "@components/button/button.component";
import { TagNameComponent } from "@components/tag-name/tag-name.component";

@Component({
  selector: "app-card-reserved-course",
  imports: [ButtonComponent, TagNameComponent, DatePipe, UpperCasePipe],
  templateUrl: "./card-reserved-course.component.html",
})
export class CardReservedCourseComponent {
  @Input() course!: any;

  @Output() cancelCourse = new EventEmitter<any>();

  onCancelClick() {
    /* TODO SUPPRIMER APRES TESTS */
    console.log("Je clique sur cancel", this.course.id, this.course);
    this.cancelCourse.emit(this.course.id);
  }
}
