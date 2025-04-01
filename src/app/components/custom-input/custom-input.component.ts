import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  imports: [CommonModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
})
export class CustomInputComponent {
  @Input() inputName: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() hintMessage: string = '';
  @Input() errorMessage: string = '';

  @Output() valueChange = new EventEmitter();

  actualType: string = 'text'; // type réel utilisé par l'input
  isPassword: boolean = false;

  ngOnInit() {
    this.actualType = this.type;
    this.isPassword = this.type === 'password';
  }

  // Trouver ici : https://medium.com/@hish.abdelshafouk/building-a-custom-input-component-with-form-validation-in-angular-fa3f93d5363e
  // control: FormControl = new FormControl("", Validators.required);

  showPassword() {
    this.actualType = this.actualType === 'password' ? 'text' : 'password';
  }

  /* TODO VOIR POUR FAIRE LES INPUTS FONCTIONNELS EN RECUPERANT LES VALEURS ET LE FORM CONTROL D'ANGULAR */
  /* https://medium.com/angular-gems/angular-custom-form-controls-nested-form-groups-made-easy-2ac09e91cf67 */
  /* https://stackblitz.com/edit/custom-form-controls-demo?file=src%2Fapp%2Fapp.component.ts */
}
