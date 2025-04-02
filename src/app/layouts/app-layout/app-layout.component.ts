import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { version } from '@config/version';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent {
  /* TODO VOIR POUR LE COMPOSANT COPYRIGHT ET EN FAIRE QU'UN SEUL PEUT ÊTRE */
  currentYear: number = new Date().getFullYear();
  version: string = version.number;

  navItems: any[] = [
    { name: 'dashboard', label: 'Dasboard', icon: 'home', url: '' },
    { name: 'dog', label: 'Mes chiens', icon: 'dog', url: '' },
    { name: 'courses', label: 'Les cours', icon: 'course', url: '' },
  ];
}
