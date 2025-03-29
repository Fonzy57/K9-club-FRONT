import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  Tag,
  TAG_TYPE_COLOR_MAP,
  TAG_TYPE_LABEL_MAP,
  TagSize,
} from './tag-name.type';

@Component({
  selector: 'app-tag-name',
  imports: [CommonModule],
  templateUrl: './tag-name.component.html',
  styleUrl: './tag-name.component.css',
})
export class TagNameComponent {
  // TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
  @Input() tag!: Tag;

  get color(): string {
    return this.tag.color ?? (TAG_TYPE_COLOR_MAP[this.tag.name] || 'gray');
  }

  get label(): string {
    return TAG_TYPE_LABEL_MAP[this.tag.name] || this.tag.name;
  }

  get size(): TagSize {
    return this.tag.size ?? 'tiny'; // Par défaut, la taille est 'tiny' si non précisée
  }
}
