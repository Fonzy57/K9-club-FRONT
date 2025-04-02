import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

// TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
export type ButtonType = 'primary' | 'ghost' | 'cancel';
// TODO AJOUTER AUSSI UN TYPE POUR LA TAILLE ET UN DISABLED
export type ButtonSize = 'normal' | 'tiny';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent implements AfterViewInit {
  // TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'normal';

  @Input() routerLink?: any[] | string;

  // Workaround for unwanted button animation on route transitions.
  // Angular recreates the component on route change (router-outlet), triggering CSS transitions.
  // We delay applying transition classes until after the initial render to avoid visual flickering.
  hasRendered = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hasRendered = true;
    });
  }

  get transitionClass(): string {
    return this.hasRendered ? 'transition duration-300 ease-in-out' : '';
  }

  /* TODO VOIR SI CETTE FONCTION EST NECESSAIRE OU PAS */
  /* @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  } */

  /* TODO REVOIR LA TAILLE DES BOUTONS? LES NORMAUX NE SONT PAS ASSEZ GRAND */
  get bgColorClass(): string {
    switch (this.type) {
      case 'ghost':
        return 'py-[7px] bg-white border border-border hover:border-text active:bg-ghost-active';
      case 'cancel':
        return 'py-2 bg-error hover:bg-error-700 active:bg-error active:ring-2 active:ring-error/50';
      case 'primary':
      default:
        return 'py-2 bg-main hover:bg-main-900 active:bg-main active:ring-2 active:ring-main/50';
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
