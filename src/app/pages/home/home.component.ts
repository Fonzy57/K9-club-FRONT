import { Component } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { CopyrightComponent } from '@components/copyright/copyright.component';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, CopyrightComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
