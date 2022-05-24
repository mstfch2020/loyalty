import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsGroupsListComponent } from './system-settings-groups-list.component';

describe('SystemSettingsGroupsListComponent', () => {
  let component: SystemSettingsGroupsListComponent;
  let fixture: ComponentFixture<SystemSettingsGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsGroupsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
