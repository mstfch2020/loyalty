import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsPeriodEditComponent } from './system-settings-period-edit.component';

describe('SystemSettingsPeriodEditComponent', () => {
  let component: SystemSettingsPeriodEditComponent;
  let fixture: ComponentFixture<SystemSettingsPeriodEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsPeriodEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsPeriodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
