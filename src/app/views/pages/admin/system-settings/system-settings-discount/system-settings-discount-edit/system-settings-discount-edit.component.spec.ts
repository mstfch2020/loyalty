import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsDiscountEditComponent } from './system-settings-discount-edit.component';

describe('SystemSettingsDiscountEditComponent', () => {
  let component: SystemSettingsDiscountEditComponent;
  let fixture: ComponentFixture<SystemSettingsDiscountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsDiscountEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsDiscountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
