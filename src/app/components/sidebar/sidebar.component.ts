import { Component } from '@angular/core';
import { NavItemComponent } from '@components/nav-item/nav-item.component';
import { navItems } from '@config/user/app-nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [NavItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  navItems: any[] = navItems;
}
