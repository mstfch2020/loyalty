import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsGroupsComponent } from './system-settings-groups.component';

describe('SystemSettingsGroupsComponent', () => {
  let component: SystemSettingsGroupsComponent;
  let fixture: ComponentFixture<SystemSettingsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
