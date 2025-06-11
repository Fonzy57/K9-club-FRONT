// ANGULAR
import { Component, Input } from "@angular/core";

// COMPONENTS
import { CustomIconComponent } from "../../custom-icon/custom-icon.component";
import { ButtonComponent } from "../../button/button.component";
import { AppRoutes } from "@config/routes";

@Component({
  selector: "app-card-empty-dog",
  imports: [CustomIconComponent, ButtonComponent],
  templateUrl: "./card-empty-dog.component.html",
})
export class CardEmptyDogComponent {
  @Input() isCourseCard?: boolean = false;
  AppRoutes = AppRoutes;
}
