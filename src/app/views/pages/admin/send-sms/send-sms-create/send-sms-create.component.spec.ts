import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsCreateComponent } from './send-sms-create.component';

describe('SendSmsCreateComponent', () => {
  let component: SendSmsCreateComponent;
  let fixture: ComponentFixture<SendSmsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSmsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSmsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
