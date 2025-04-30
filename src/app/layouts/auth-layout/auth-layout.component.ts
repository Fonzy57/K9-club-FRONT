// ANGULAR
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';

// CONFIG
import { version } from '@config/version';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent implements OnInit {
  /* TODO VOIR POUR LE COMPOSANT COPYRIGHT ET EN FAIRE QU'UN SEUL PEUT ÊTRE */
  currentYear: number = new Date().getFullYear();
  version: string = version.number;

  title: string = '';
  subtitle: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // On initial load, retrieve layout-related data from the first child route
    this.setLayoutData(this.route.firstChild?.snapshot?.data);

    // On each navigation end event (useful when navigating between pages within the layout)
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.route.firstChild?.snapshot;
        // Update layout data whenever the route changes
        this.setLayoutData(child?.data);
      });
  }

  private setLayoutData(data: any): void {
    // Set title and subtitle from the route's data, with fallback to empty string
    this.title = data?.['title'] ?? '';
    this.subtitle = data?.['subtitle'] ?? '';
  }
}
