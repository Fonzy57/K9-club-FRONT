import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNextCourseComponent } from './card-next-course.component';

describe('CardNextCourseComponent', () => {
  let component: CardNextCourseComponent;
  let fixture: ComponentFixture<CardNextCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNextCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNextCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
