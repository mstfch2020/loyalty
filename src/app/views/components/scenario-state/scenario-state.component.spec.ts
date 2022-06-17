import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioStateComponent } from './scenario-state.component';

describe('ScenarioStateComponent', () => {
  let component: ScenarioStateComponent;
  let fixture: ComponentFixture<ScenarioStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
