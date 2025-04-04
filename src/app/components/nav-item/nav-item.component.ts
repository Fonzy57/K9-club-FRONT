import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink, CustomIconComponent, RouterLinkActive, NgClass],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css',
})
export class NavItemComponent {
  @Input() label: string = '';
  @Input() url: string = '';
  @Input() iconName: string = '';
}
