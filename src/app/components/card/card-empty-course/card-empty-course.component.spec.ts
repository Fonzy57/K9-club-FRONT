import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmptyCourseComponent } from './card-empty-course.component';

describe('CardEmptyCourseComponent', () => {
  let component: CardEmptyCourseComponent;
  let fixture: ComponentFixture<CardEmptyCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEmptyCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEmptyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
