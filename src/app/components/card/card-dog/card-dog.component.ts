// ANGULAR
import { Component, Input } from '@angular/core';
import { DatePipe, LowerCasePipe } from '@angular/common';

// COMPONENTS
import { TagNameComponent } from '@components/tag-name/tag-name.component';

// CUSTOM PIPES
import { AgePipe } from 'app/pipes/age.pipe';

@Component({
  selector: 'app-card-dog',
  imports: [TagNameComponent, LowerCasePipe, AgePipe, DatePipe],
  templateUrl: './card-dog.component.html',
})
export class CardDogComponent {
  /* TODO REVOIR TYPAGE */
  @Input() dog!: CardDog;
}
