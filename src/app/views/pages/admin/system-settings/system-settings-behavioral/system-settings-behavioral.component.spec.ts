import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsBehavioralComponent } from './system-settings-behavioral.component';

describe('SystemSettingsBehavioralComponent', () => {
  let component: SystemSettingsBehavioralComponent;
  let fixture: ComponentFixture<SystemSettingsBehavioralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsBehavioralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsBehavioralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
