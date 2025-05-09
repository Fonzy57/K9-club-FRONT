// ANGULAR
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// COMPONENTS
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
