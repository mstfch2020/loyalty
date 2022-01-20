import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsDiscountGridComponent } from './system-settings-discount-grid.component';

describe('SystemSettingsDiscountGridComponent', () => {
  let component: SystemSettingsDiscountGridComponent;
  let fixture: ComponentFixture<SystemSettingsDiscountGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsDiscountGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsDiscountGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
