import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '@config/routes';
import { CustomIconComponent } from '../custom-icon/custom-icon.component';

@Component({
  selector: 'app-back-button',
  imports: [RouterLink, CustomIconComponent],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css',
})
export class BackButtonComponent {
  AppRoutes = AppRoutes;
  @Input() routerLink?: string[] | string;
}
