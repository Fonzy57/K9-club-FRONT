import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReservedCourseComponent } from './card-reserved-course.component';

describe('CardReservedCourseComponent', () => {
  let component: CardReservedCourseComponent;
  let fixture: ComponentFixture<CardReservedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReservedCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardReservedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
