import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupRootComponent } from './customer-group-root.component';

describe('CustomerGroupRootComponent', () => {
  let component: CustomerGroupRootComponent;
  let fixture: ComponentFixture<CustomerGroupRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
