import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsPeriodComponent } from './system-settings-period.component';

describe('SystemSettingsPeriodComponent', () => {
  let component: SystemSettingsPeriodComponent;
  let fixture: ComponentFixture<SystemSettingsPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
