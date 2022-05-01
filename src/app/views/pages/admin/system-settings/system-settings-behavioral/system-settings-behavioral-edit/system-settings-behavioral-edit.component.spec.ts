import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsBehavioralEditComponent } from './system-settings-behavioral-edit.component';

describe('SystemSettingsBehavioralEditComponent', () => {
  let component: SystemSettingsBehavioralEditComponent;
  let fixture: ComponentFixture<SystemSettingsBehavioralEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsBehavioralEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsBehavioralEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
