import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupGridComponent } from './customer-group-grid.component';

describe('CustomerGroupGridComponent', () => {
  let component: CustomerGroupGridComponent;
  let fixture: ComponentFixture<CustomerGroupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
