import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsRootComponent } from './system-settings-root.component';

describe('SystemSettingsRootComponent', () => {
  let component: SystemSettingsRootComponent;
  let fixture: ComponentFixture<SystemSettingsRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
