// ANGULAR
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// COMPONENTS
import { NavItemComponent } from '@components/nav-item/nav-item.component';
import { DisconnectButtonComponent } from '../disconnect/disconnect-button/disconnect-button.component';

// CONFIG
import { AppRoutes } from '@config/routes';
import { userNavItems } from '@config/navigation/user-nav-items';
import { adminNavItems } from '@config/navigation/admin-nav-items';

// SERVICES
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [NavItemComponent, DisconnectButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  navItems: any[] = [];
  accountLink: string = '';
  AppRoutes = AppRoutes;

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
}
