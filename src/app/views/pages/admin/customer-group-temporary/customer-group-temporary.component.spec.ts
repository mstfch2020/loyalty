import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupTemporaryComponent } from './customer-group-temporary.component';

describe('CustomerGroupTemporaryComponent', () => {
  let component: CustomerGroupTemporaryComponent;
  let fixture: ComponentFixture<CustomerGroupTemporaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupTemporaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupTemporaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
