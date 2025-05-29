import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmptyReservedCourseComponent } from './card-empty-reserved-course.component';

describe('CardEmptyReservedCourseComponent', () => {
  let component: CardEmptyReservedCourseComponent;
  let fixture: ComponentFixture<CardEmptyReservedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEmptyReservedCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEmptyReservedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
