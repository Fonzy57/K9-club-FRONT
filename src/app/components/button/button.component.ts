import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

// TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
export type ButtonType = 'primary' | 'ghost';
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
}
