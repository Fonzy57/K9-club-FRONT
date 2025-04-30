import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectButtonComponent } from './disconnect-button.component';

describe('DisconnectButtonComponent', () => {
  let component: DisconnectButtonComponent;
  let fixture: ComponentFixture<DisconnectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisconnectButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisconnectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
