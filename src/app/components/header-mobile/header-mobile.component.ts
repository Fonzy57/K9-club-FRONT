// ANGULAR
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, Inject, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

// COMPONENTS
import { NavItemComponent } from '@components/nav-item/nav-item.component';

// CONFIG
import { AppRoutes } from '@config/routes';
import { userNavItems } from '@config/navigation/user-nav-items';
import { adminNavItems } from '@config/navigation/admin-nav-items';

// SERVICES
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-header-mobile',
  imports: [NavItemComponent, CommonModule],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.css',
})
export class HeaderMobileComponent {
  auth: AuthService = inject(AuthService);

  navItems: any[] = [];
  accountLink: string = '';
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

  ngOnInit() {
    const userRole = this.auth.userInfos?.role;

    if (userRole) {
      switch (userRole) {
        case 'ROLE_SUPER_ADMIN':
          // TODO CHANGER QUAND LA PAGE SERA READY
          this.navItems = userNavItems;

          // TODO FAIRE LA PAGE ET CHANGER LE LIEN QUAND C'EST FAIT
          this.accountLink = AppRoutes.app.admin.accountFull;
          break;
        case 'ROLE_ADMIN':
          this.navItems = adminNavItems;
          // TODO FAIRE LA PAGE
          this.accountLink = AppRoutes.app.admin.accountFull;
          break;
        case 'ROLE_COACH':
          // TODO CHANGER QUAND LA PAGE SERA READY
          this.navItems = userNavItems;
          // TODO FAIRE LA PAGE ET CHANGER LE LIEN QUAND C'EST FAIT
          this.accountLink = AppRoutes.app.admin.accountFull;
          break;
        case 'ROLE_OWNER':
          this.navItems = userNavItems;
          this.accountLink = AppRoutes.app.user.accountFull;
          break;
        default:
          break;
      }
    }
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
