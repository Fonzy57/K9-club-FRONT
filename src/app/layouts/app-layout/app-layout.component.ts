import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { version } from '@config/version';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderMobileComponent } from '@components/header-mobile/header-mobile.component';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderMobileComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent {
  /* TODO VOIR POUR LE COMPOSANT COPYRIGHT ET EN FAIRE QU'UN SEUL PEUT ÊTRE */
  currentYear: number = new Date().getFullYear();
  version: string = version.number;
}
