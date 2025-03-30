import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDogComponent } from './card-dog.component';

describe('CardDogComponent', () => {
  let component: CardDogComponent;
  let fixture: ComponentFixture<CardDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
