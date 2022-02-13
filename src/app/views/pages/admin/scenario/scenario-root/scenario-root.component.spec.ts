import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioRootComponent } from './scenario-root.component';

describe('ScenarioRootComponent', () => {
  let component: ScenarioRootComponent;
  let fixture: ComponentFixture<ScenarioRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
