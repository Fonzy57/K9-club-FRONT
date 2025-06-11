import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmptyDogComponent } from './card-empty-dog.component';

describe('CardEmptyDogComponent', () => {
  let component: CardEmptyDogComponent;
  let fixture: ComponentFixture<CardEmptyDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEmptyDogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEmptyDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
