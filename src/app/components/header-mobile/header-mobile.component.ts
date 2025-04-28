import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavItemComponent } from '@components/nav-item/nav-item.component';
import { AppRoutes } from '@config/routes';
import { userNavItems } from '@config/user/user-nav-items';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header-mobile',
  imports: [NavItemComponent, CommonModule],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.css',
})
export class HeaderMobileComponent {
  navItems: any[] = userNavItems;
  AppRoutes = AppRoutes;

  isOpen = false;

  // Avoid transition on component mount
  hasInteracted = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) {
    // Close mobile menu when navigation ends
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isOpen) {
          this.closeMenu();
        }
      });
  }

  toggleMenu(): void {
    this.hasInteracted = true;
    this.isOpen = !this.isOpen;

    // Toggle the 'no-scroll-mobile' class on the <body> element to prevent background scrolling
    const body = this.document.body;
    if (this.isOpen) {
      this.renderer.addClass(body, 'no-scroll-mobile');
    } else {
      this.renderer.removeClass(body, 'no-scroll-mobile');
    }
  }

  closeMenu(): void {
    this.isOpen = false;
    this.renderer.removeClass(this.document.body, 'no-scroll-mobile');
  }
}
