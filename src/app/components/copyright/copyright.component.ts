// ANGULAR
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// CONFIG
import { AppRoutes } from '@config/routes';
import { version } from '@config/version';

@Component({
  selector: 'app-copyright',
  imports: [RouterLink],
  templateUrl: './copyright.component.html',
})
export class CopyrightComponent {
  currentYear: number = new Date().getFullYear();
  version: string = version.number;
  AppRoutes = AppRoutes;
}
