import { Component } from '@angular/core';
import { NavItemComponent } from '@components/nav-item/nav-item.component';
import { AppRoutes } from '@config/routes';
import { userNavItems } from '@config/user/user-nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [NavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  navItems: any[] = userNavItems;
  AppRoutes = AppRoutes;

  // TODO ICI POUR SIMULER LE ROLE ET LES LIENS DANS LA SIDEBAR
  userRole: 'ADMIN' | 'USER' | 'COACH' = 'USER';
}
