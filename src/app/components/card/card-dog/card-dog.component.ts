import { Component } from '@angular/core';
import { TagNameComponent } from '../../tag-name/tag-name.component';

@Component({
  selector: 'app-card-dog',
  imports: [TagNameComponent],
  templateUrl: './card-dog.component.html',
  styleUrl: './card-dog.component.css',
})
export class CardDogComponent {}
