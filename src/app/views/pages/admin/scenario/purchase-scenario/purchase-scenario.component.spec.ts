import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseScenarioComponent } from './purchase-scenario.component';

describe('PurchaseScenarioComponent', () => {
  let component: PurchaseScenarioComponent;
  let fixture: ComponentFixture<PurchaseScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
