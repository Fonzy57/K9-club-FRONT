import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  ionHomeOutline,
  ionPawOutline,
  ionCalendarNumberOutline,
  ionCalendarClearOutline,
  ionPersonOutline,
  ionPencilOutline,
  ionTrashOutline,
  ionInformationCircleOutline,
  ionChevronBackOutline,
  ionAddOutline,
  ionSunnyOutline,
  ionMoonOutline,
} from '@ng-icons/ionicons';

@Component({
  selector: 'app-custom-icon',
  imports: [NgIcon, NgClass],
  templateUrl: './custom-icon.component.html',
  styleUrl: './custom-icon.component.css',
  viewProviders: [
    provideIcons({
      ionHomeOutline,
      ionPawOutline,
      ionCalendarNumberOutline,
      ionCalendarClearOutline,
      ionPersonOutline,
      ionPencilOutline,
      ionTrashOutline,
      ionInformationCircleOutline,
      ionChevronBackOutline,
      ionAddOutline,
      ionSunnyOutline,
      ionMoonOutline,
    }),
  ],
})
export class CustomIconComponent {
  @Input() name!: string;
  @Input() size: string = '24';
  @Input() class: string = '';
}
