import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupTemporaryRootComponent } from './customer-group-temporary-root.component';

describe('CustomerGroupTemporaryRootComponent', () => {
  let component: CustomerGroupTemporaryRootComponent;
  let fixture: ComponentFixture<CustomerGroupTemporaryRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupTemporaryRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupTemporaryRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
