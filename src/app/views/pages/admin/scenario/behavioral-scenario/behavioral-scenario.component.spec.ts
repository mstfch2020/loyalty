import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehavioralScenarioComponent } from './behavioral-scenario.component';

describe('BehavioralScenarioComponent', () => {
  let component: BehavioralScenarioComponent;
  let fixture: ComponentFixture<BehavioralScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehavioralScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehavioralScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
