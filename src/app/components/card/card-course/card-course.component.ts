// ANGULAR
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DatePipe, NgClass, UpperCasePipe } from "@angular/common";

// COMPONENTS
import { ButtonComponent } from "@components/button/button.component";
import { TagNameComponent } from "@components/tag-name/tag-name.component";

@Component({
  selector: "app-card-course",
  imports: [
    ButtonComponent,
    TagNameComponent,
    NgClass,
    DatePipe,
    UpperCasePipe,
  ],
  templateUrl: "./card-course.component.html",
})
export class CardCourseComponent {
  @Input() course!: CourseDto;

  @Output() reserve = new EventEmitter<any>();

  onReserveClick() {
    this.reserve.emit(this.course);
  }

  get reservedPlaces(): number {
    return (
      this.course?.registrations?.filter((reg) => reg.status === "CONFIRMED")
        .length ?? 0
    );
  }

  get isCourseFull(): boolean {
    return this.reservedPlaces === this.course.maxParticipants;
  }

  get courseDuration() {
    const start = new Date(this.course.startDate);
    const end = new Date(this.course.endDate);

    const durationMs = end.getTime() - start.getTime();

    // Hour and minutes conversion
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60);

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}min`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    return `${minutes}min`;
  }

  get placesColor(): string {
    const placesAvailableInPercent =
      this.reservedPlaces / this.course.maxParticipants;

    if (placesAvailableInPercent > 0.7) {
      return "text-error";
    } else if (
      placesAvailableInPercent >= 0.5 &&
      placesAvailableInPercent <= 0.6
    ) {
      return "text-warning";
    }
    return "text-success";
  }
}
