import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card-wrapper",
  imports: [CommonModule],
  templateUrl: "./card-wrapper.component.html",
})
export class CardWrapperComponent {
  @Input() class: string = "";
}
