// ANGULAR
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

// COMPONENTS
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

// TYPES
export type ButtonType = 'primary' | 'ghost' | 'cancel';
export type ButtonSize = 'normal' | 'tiny';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink, CustomIconComponent],
  templateUrl: './button.component.html',
})
export class ButtonComponent implements AfterViewInit {
  // TODO REVOIR ICI LE TYPAGE POUR QUE MON IDE ME LE PROPOSE
  @Input() typeButton: ButtonType = 'primary';
  @Input() size: ButtonSize = 'normal';
  @Input() disabled = false;

  // FOR ICON
  /* TODO GERER LA COULEUR DE L'ICON SELON LE TYPE DE BOUTON */
  @Input() iconName?: string; // Le nom de l’icône
  @Input() iconSize: string = '18'; // Tu peux mettre ce que tu veux par défaut
  @Input() iconClass: string = ''; // Pour passer des classes utilitaires (optionnel)

  @Input() routerLink?: any[] | string;

  @Output() onClick = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent) {
    this.onClick.emit(event);
  }

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

  /* TODO REVOIR LA TAILLE DES BOUTONS? LES NORMAUX NE SONT PAS ASSEZ GRAND */
  get bgColorClass(): string {
    switch (this.typeButton) {
      case 'ghost':
        return 'py-[7px] bg-white border border-border hover:border-text active:bg-ghost-active disabled:bg-white/20 disabled:hover:border-border disabled:shadow-none disabled:cursor-not-allowed';
      /* TODO CHANGER STYLE DISABLED POUR CANCEL */
      case 'cancel':
        return 'py-2 bg-error hover:bg-error-700 active:bg-error active:ring-2 active:ring-error/50';
      case 'primary':
      default:
        return 'py-2 bg-main hover:bg-main-900 active:bg-main active:ring-2 active:ring-main/50 disabled:bg-main/40 disabled:active:ring-0 disabled:cursor-not-allowed';
    }
  }

  get textColorClass(): string {
    switch (this.typeButton) {
      case 'ghost':
        return 'text-text disabled:text-text/20';
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
