import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoachEditComponent } from './admin-coach-edit.component';

describe('AdminCoachEditComponent', () => {
  let component: AdminCoachEditComponent;
  let fixture: ComponentFixture<AdminCoachEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCoachEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoachEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
