import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsDiscountListComponent } from './system-settings-discount-list.component';

describe('SystemSettingsDiscountListComponent', () => {
  let component: SystemSettingsDiscountListComponent;
  let fixture: ComponentFixture<SystemSettingsDiscountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsDiscountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsDiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
