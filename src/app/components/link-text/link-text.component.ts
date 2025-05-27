import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-text',
  imports: [CommonModule, RouterLink],
  templateUrl: './link-text.component.html',
})
export class LinkTextComponent {
  @Input() routerLink?: any[] | string;
}
