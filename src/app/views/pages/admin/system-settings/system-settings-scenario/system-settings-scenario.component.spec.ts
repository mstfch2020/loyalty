import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsScenarioComponent } from './system-settings-scenario.component';

describe('SystemSettingsScenarioComponent', () => {
  let component: SystemSettingsScenarioComponent;
  let fixture: ComponentFixture<SystemSettingsScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
