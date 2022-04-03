import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsListComponent } from './send-sms-list.component';

describe('SendSmsListComponent', () => {
  let component: SendSmsListComponent;
  let fixture: ComponentFixture<SendSmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSmsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
