// ANGULAR
import { Component, Input } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

// COMPONENTS
import { TagNameComponent } from '@components/tag-name/tag-name.component';

@Component({
  selector: 'app-card-dog',
  imports: [TagNameComponent, LowerCasePipe],
  templateUrl: './card-dog.component.html',
  styleUrl: './card-dog.component.css',
})
export class CardDogComponent {
  /* TODO REVOIR TYPAGE */
  @Input() dog!: CardDog;
}
