import { Component, Input } from '@angular/core';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

export type Info = {
  name: string;
  number: number;
  tooltip: string;
};

@Component({
  selector: 'app-card-info',
  imports: [CustomIconComponent],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css',
})
export class CardInfoComponent {
  @Input() information!: Info;
}
