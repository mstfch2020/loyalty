import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupTemporaryEditComponent } from './customer-group-temporary-edit.component';

describe('CustomerGroupTemporaryEditComponent', () => {
  let component: CustomerGroupTemporaryEditComponent;
  let fixture: ComponentFixture<CustomerGroupTemporaryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupTemporaryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupTemporaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
