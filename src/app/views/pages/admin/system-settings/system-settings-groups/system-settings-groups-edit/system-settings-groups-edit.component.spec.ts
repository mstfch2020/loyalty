import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsGroupsEditComponent } from './system-settings-groups-edit.component';

describe('SystemSettingsGroupsEditComponent', () => {
  let component: SystemSettingsGroupsEditComponent;
  let fixture: ComponentFixture<SystemSettingsGroupsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsGroupsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsGroupsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
