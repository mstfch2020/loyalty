import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsLevelComponent } from './system-settings-level.component';

describe('SystemSettingsLevelComponent', () => {
  let component: SystemSettingsLevelComponent;
  let fixture: ComponentFixture<SystemSettingsLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
