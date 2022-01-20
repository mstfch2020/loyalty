import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsDiscountComponent } from './system-settings-discount.component';

describe('SystemSettingsDiscountComponent', () => {
  let component: SystemSettingsDiscountComponent;
  let fixture: ComponentFixture<SystemSettingsDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
