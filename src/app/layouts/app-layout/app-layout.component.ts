import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { version } from '@config/version';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { navItems } from '@config/user/app-nav-items';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent {
  /* TODO VOIR POUR LE COMPOSANT COPYRIGHT ET EN FAIRE QU'UN SEUL PEUT ÊTRE */
  currentYear: number = new Date().getFullYear();
  version: string = version.number;
  navItems: any[] = navItems;
}
