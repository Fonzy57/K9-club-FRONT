import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

// TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
export type ButtonType = 'primary' | 'ghost' | 'cancel';
// TODO AJOUTER AUSSI UN TYPE POUR LA TAILLE ET UN DISABLED
export type ButtonSize = 'normal' | 'tiny';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  // TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'normal';
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }

  get bgColorClass(): string {
    switch (this.type) {
      case 'ghost':
        return 'bg-white border border-border hover:border-text active:bg-ghost-active';
      case 'cancel':
        return 'bg-error hover:bg-error-700 active:bg-error active:ring-2 active:ring-error/50';
      case 'primary':
      default:
        return 'bg-main hover:bg-main-900 active:bg-main active:ring-2 active:ring-main/50';
    }
  }

  get textColorClass(): string {
    switch (this.type) {
      case 'ghost':
        return 'text-text';
      case 'primary':
      case 'cancel':
      default:
        return 'text-white';
    }
  }

  get sizeClass(): string {
    switch (this.size) {
      case 'tiny':
        return 'px-3.5 text-sm';
      case 'normal':
      default:
        return 'px-[18px]';
    }
  }
}
