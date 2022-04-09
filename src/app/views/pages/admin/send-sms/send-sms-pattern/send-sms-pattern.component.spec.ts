import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsPatternComponent } from './send-sms-pattern.component';

describe('SendSmsPatternComponent', () => {
  let component: SendSmsPatternComponent;
  let fixture: ComponentFixture<SendSmsPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSmsPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSmsPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
