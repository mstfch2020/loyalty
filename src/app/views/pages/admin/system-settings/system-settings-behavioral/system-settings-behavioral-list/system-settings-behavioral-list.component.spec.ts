import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsBehavioralListComponent } from './system-settings-behavioral-list.component';

describe('SystemSettingsBehavioralListComponent', () => {
  let component: SystemSettingsBehavioralListComponent;
  let fixture: ComponentFixture<SystemSettingsBehavioralListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsBehavioralListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsBehavioralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
