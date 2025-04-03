import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { NavItemComponent } from '@components/nav-item/nav-item.component';
import { navItems } from '@config/user/app-nav-items';

@Component({
  selector: 'app-header-mobile',
  imports: [NavItemComponent, CommonModule],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.css',
})
export class HeaderMobileComponent {
  navItems: any[] = navItems;

  isOpen = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;

    const body = this.document.body;
    if (this.isOpen) {
      this.renderer.addClass(body, 'no-scroll-mobile');
    } else {
      this.renderer.removeClass(body, 'no-scroll-mobile');
    }
  }
}
