import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupTemporaryCampaignComponent } from './customer-group-temporary-campaign.component';

describe('CustomerGroupTemporaryCampaignComponent', () => {
  let component: CustomerGroupTemporaryCampaignComponent;
  let fixture: ComponentFixture<CustomerGroupTemporaryCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupTemporaryCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupTemporaryCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
