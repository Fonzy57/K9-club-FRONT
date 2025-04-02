import { Component } from '@angular/core';
import { version } from '@config/version';

@Component({
  selector: 'app-copyright',
  imports: [],
  templateUrl: './copyright.component.html',
  styleUrl: './copyright.component.css',
})
export class CopyrightComponent {
  currentYear: number = new Date().getFullYear();
  version: string = version.number;
}
