// ANGULAR
import { Component, Input } from '@angular/core';

// COMPONENTS
import { TagNameComponent } from '@components/tag-name/tag-name.component';

// TYPES
import { CardDog } from './card-dog.type';

@Component({
  selector: 'app-card-dog',
  imports: [TagNameComponent],
  templateUrl: './card-dog.component.html',
  styleUrl: './card-dog.component.css',
})
export class CardDogComponent {
  @Input() dog!: CardDog;
}
