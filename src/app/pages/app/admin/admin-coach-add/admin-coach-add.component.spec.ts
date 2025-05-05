import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoachAddComponent } from './admin-coach-add.component';

describe('AdminCoachAddComponent', () => {
  let component: AdminCoachAddComponent;
  let fixture: ComponentFixture<AdminCoachAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCoachAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoachAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
