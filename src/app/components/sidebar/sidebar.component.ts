// ANGULAR
import { Component } from '@angular/core';

// COMPONENTS
import { NavItemComponent } from '@components/nav-item/nav-item.component';

// CONFIG
import { AppRoutes } from '@config/routes';
import { userNavItems } from '@config/navigation/user-nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [NavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  navItems: any[] = userNavItems;
  AppRoutes = AppRoutes;

  // TODO CHANGER LA ET CHANGER LES LIENS DANS LA SIDEBAR ET LE MENU
  // TODO ICI POUR SIMULER LE ROLE ET LES LIENS DANS LA SIDEBAR
  userRole: 'ADMIN' | 'USER' | 'COACH' = 'USER';
}
