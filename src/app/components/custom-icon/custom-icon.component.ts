// ANGULAR
import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

// NG ICONS
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  ionAddOutline,
  ionCalendarNumberOutline,
  ionCalendarClearOutline,
  ionCheckmarkOutline,
  ionChevronBackOutline,
  ionEyeOffOutline,
  ionEyeOutline,
  ionHomeOutline,
  ionInformationCircleOutline,
  ionMoonOutline,
  ionPawOutline,
  ionPersonOutline,
  ionPencilOutline,
  ionSunnyOutline,
  ionTrashOutline,
} from '@ng-icons/ionicons';

@Component({
  selector: 'app-custom-icon',
  imports: [NgIcon, NgClass],
  templateUrl: './custom-icon.component.html',
  styleUrl: './custom-icon.component.css',
  viewProviders: [
    provideIcons({
      ionAddOutline,
      ionCalendarNumberOutline,
      ionCalendarClearOutline,
      ionCheckmarkOutline,
      ionChevronBackOutline,
      ionEyeOffOutline,
      ionEyeOutline,
      ionHomeOutline,
      ionInformationCircleOutline,
      ionMoonOutline,
      ionPawOutline,
      ionPersonOutline,
      ionPencilOutline,
      ionSunnyOutline,
      ionTrashOutline,
    }),
  ],
})
export class CustomIconComponent {
  @Input() name!: string;
  @Input() size: string = '24';
  @Input() class: string = '';
}
