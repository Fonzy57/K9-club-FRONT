import { Component } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';

@Component({
  selector: 'app-register',
  imports: [ButtonComponent, CustomInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
