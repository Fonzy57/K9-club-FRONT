// ANGULAR
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-name',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './tag-name.component.html',
})
export class TagNameComponent {
  @Input() tag!: TagDto;

  get size(): TagSize {
    return this.tag?.size ?? 'tiny'; // Par défaut, la taille est 'tiny' si non précisée
  }
}
