import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsPeriodListComponent } from './system-settings-period-list.component';

describe('SystemSettingsPeriodListComponent', () => {
  let component: SystemSettingsPeriodListComponent;
  let fixture: ComponentFixture<SystemSettingsPeriodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsPeriodListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
