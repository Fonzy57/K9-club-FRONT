// ANGULAR
import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

// NG ICONS
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  ionAddOutline,
  ionAlertCircleOutline,
  ionBalloonOutline,
  ionBodyOutline,
  ionCalendarNumberOutline,
  ionCalendarClearOutline,
  ionCheckmarkOutline,
  ionChevronBackOutline,
  ionEyeOffOutline,
  ionEyeOutline,
  ionFemaleOutline,
  ionHomeOutline,
  ionInformationCircleOutline,
  ionLogOutOutline,
  ionMaleOutline,
  ionMoonOutline,
  ionPawOutline,
  ionPencilOutline,
  ionPersonAddOutline,
  ionPersonOutline,
  ionPersonRemoveOutline,
  ionRocketOutline,
  ionSunnyOutline,
  ionTennisballOutline,
  ionTrashOutline,
  ionWarningOutline,
} from "@ng-icons/ionicons";

@Component({
  selector: "app-custom-icon",
  imports: [NgIcon, NgClass],
  templateUrl: "./custom-icon.component.html",
  viewProviders: [
    provideIcons({
      ionAddOutline,
      ionAlertCircleOutline,
      ionBalloonOutline,
      ionBodyOutline,
      ionCalendarNumberOutline,
      ionCalendarClearOutline,
      ionCheckmarkOutline,
      ionChevronBackOutline,
      ionEyeOffOutline,
      ionEyeOutline,
      ionFemaleOutline,
      ionHomeOutline,
      ionInformationCircleOutline,
      ionLogOutOutline,
      ionMaleOutline,
      ionMoonOutline,
      ionPawOutline,
      ionPencilOutline,
      ionPersonAddOutline,
      ionPersonOutline,
      ionPersonRemoveOutline,
      ionRocketOutline,
      ionSunnyOutline,
      ionTennisballOutline,
      ionTrashOutline,
      ionWarningOutline,
    }),
  ],
})
export class CustomIconComponent {
  @Input() name!: string;
  @Input() size: string = "24";
  @Input() class: string = "";
}
