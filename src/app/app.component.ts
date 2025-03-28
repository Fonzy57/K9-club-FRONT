import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'k9-club';

  handleClickPrimary() {
    console.log('Bouton primary cliqué');
  }
}
