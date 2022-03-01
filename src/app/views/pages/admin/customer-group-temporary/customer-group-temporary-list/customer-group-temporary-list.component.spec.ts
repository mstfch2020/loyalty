import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupTemporaryListComponent } from './customer-group-temporary-list.component';

describe('CustomerGroupTemporaryListComponent', () => {
  let component: CustomerGroupTemporaryListComponent;
  let fixture: ComponentFixture<CustomerGroupTemporaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupTemporaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupTemporaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
