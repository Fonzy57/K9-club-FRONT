import { Component } from '@angular/core';
import { navItems } from '@config/app-nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  navItems: any[] = navItems;
}
