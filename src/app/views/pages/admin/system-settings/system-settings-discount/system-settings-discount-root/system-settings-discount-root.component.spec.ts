import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsDiscountRootComponent } from './system-settings-discount-root.component';

describe('SystemSettingsDiscountRootComponent', () => {
  let component: SystemSettingsDiscountRootComponent;
  let fixture: ComponentFixture<SystemSettingsDiscountRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsDiscountRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsDiscountRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
