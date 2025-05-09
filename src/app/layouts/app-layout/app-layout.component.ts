// ANGULAR
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// COMPONENTS
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderMobileComponent } from '@components/header-mobile/header-mobile.component';

// CONFIG
import { version } from '@config/version';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderMobileComponent],
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  /* TODO VOIR POUR LE COMPOSANT COPYRIGHT ET EN FAIRE QU'UN SEUL PEUT ÊTRE */
  currentYear: number = new Date().getFullYear();
  version: string = version.number;
}
