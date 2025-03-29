import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { TagNameComponent } from './components/tag-name/tag-name.component';
import { Tag } from './components/tag-name/tag-name.type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, TagNameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'k9-club';

  handleClickPrimary() {
    console.log('Bouton primary cliqué');
  }

  /* TODO POUR LES TAGS */
  tagsTiny: Tag[] = [
    { name: 'red', color: 'red', size: 'tiny' },
    { name: 'orange', color: 'orange', size: 'tiny' },
    { name: 'yellow', color: 'yellow', size: 'tiny' },
    { name: 'green', color: 'green', size: 'tiny' },
    { name: 'blue', color: 'blue', size: 'tiny' },
    { name: 'purple', color: 'purple', size: 'tiny' },
    { name: 'orange', color: 'orange', size: 'tiny' },
  ];

  tagsNormal: Tag[] = [
    { name: 'red', color: 'red', size: 'normal' },
    { name: 'orange', color: 'orange', size: 'normal' },
    { name: 'yellow', color: 'yellow', size: 'normal' },
    { name: 'green', color: 'green', size: 'normal' },
    { name: 'blue', color: 'blue', size: 'normal' },
    { name: 'purple', color: 'purple', size: 'normal' },
    { name: 'orange', color: 'orange', size: 'normal' },
  ];
}
