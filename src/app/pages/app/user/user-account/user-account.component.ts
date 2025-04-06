import { Component } from '@angular/core';
import { CustomInputComponent } from '@components/custom-input/custom-input.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-user-account',
  imports: [CustomInputComponent, ButtonComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css',
})
export class UserAccountComponent {}
