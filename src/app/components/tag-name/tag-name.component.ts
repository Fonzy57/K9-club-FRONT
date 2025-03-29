import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TagColor, TagSize } from './tag-name.type';

@Component({
  selector: 'app-tag-name',
  imports: [CommonModule],
  templateUrl: './tag-name.component.html',
  styleUrl: './tag-name.component.css',
})
export class TagNameComponent {
  // TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
  @Input() color: TagColor = 'red';
  @Input() size: TagSize = 'tiny';
}
