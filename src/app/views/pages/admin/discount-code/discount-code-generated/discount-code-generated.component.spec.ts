import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeGeneratedComponent } from './discount-code-generated.component';

describe('DiscountCodeGeneratedComponent', () => {
  let component: DiscountCodeGeneratedComponent;
  let fixture: ComponentFixture<DiscountCodeGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodeGeneratedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodeGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
