import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupTemporaryGridComponent } from './customer-group-temporary-grid.component';

describe('CustomerGroupTemporaryGridComponent', () => {
  let component: CustomerGroupTemporaryGridComponent;
  let fixture: ComponentFixture<CustomerGroupTemporaryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupTemporaryGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupTemporaryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
