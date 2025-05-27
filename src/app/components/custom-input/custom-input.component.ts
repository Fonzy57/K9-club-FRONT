// ANGULAR
import {
  Component,
  Input,
  forwardRef,
  signal,
  computed,
  Output,
  EventEmitter,
} from '@angular/core';

// Import de l’interface à implémenter pour que le composant soit compatible avec Angular Forms
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule, CustomIconComponent],
  templateUrl: './custom-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Fournit ce composant comme un contrôleur de formulaire custom
      useExisting: forwardRef(() => CustomInputComponent), // Référence différée vers lui-même (circulaire)
      multi: true, // Permet plusieurs value accessors (nécessaire ici)
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  // === INPUTS UTILISÉS DANS LE TEMPLATE ===
  @Input() inputName = ''; // Attribut 'name' et 'id' de l’input
  @Input() label = ''; // Texte du label affiché au-dessus
  @Input() type = 'text'; // Type de l’input (text, password, etc.)
  @Input() placeholder = ''; // Placeholder affiché dans l’input
  @Input() hintMessage = ''; // Message informatif facultatif
  @Input() errorMessage = ''; // Message d’erreur à afficher

  @Output() valueChange = new EventEmitter<string>();

  // === GESTION DE LA VALEUR DU CHAMP ===
  private _value = signal(''); // Signal contenant la valeur de l’input (remplace une variable simple)
  value = computed(() => this._value()); // Permet d’accéder à la valeur courante facilement

  // === LOGIQUE MOT DE PASSE ===
  actualType = signal('text'); // sera remplacé dans ngOnInit()
  isPassword = computed(() => this.actualType() === 'password');

  // === MÉTHODES REQUISES PAR ControlValueAccessor ===
  private onChange = (_: any) => {}; // Callback à appeler quand la valeur change (fourni par Angular)
  private onTouched = () => {}; // Callback à appeler quand le champ est touché (blur, etc.)

  writeValue(value: string): void {
    // Appelé par Angular pour mettre à jour la valeur externe dans le champ
    this._value.set(value || '');
  }

  registerOnChange(fn: any): void {
    // Angular fournit une fonction à appeler quand la valeur change
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Angular fournit une fonction à appeler quand le champ est touché
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this._value.set(newValue); // Met à jour le signal
    this.onChange(newValue); // Notifie Angular Reactive Forms
    this.valueChange.emit(newValue); // <<<<< NOTIFIE ton parent que la valeur a changé
  }
  togglePassword(): void {
    // Alterne entre 'text' et 'password' pour afficher ou cacher le mot de passe
    this.actualType.set(this.actualType() === 'password' ? 'text' : 'password');
  }

  ngOnInit(): void {
    // Initialiser le type réel en fonction de l’@Input()
    this.actualType.set(this.type);
  }

  get inputBorderStyle(): string {
    if (this.errorMessage) {
      return 'border-error focus-within:border-error focus-within:ring-error/20';
    } else {
      return 'border-border focus-within:border-main focus-within:ring-main/20';
    }
  }
}
