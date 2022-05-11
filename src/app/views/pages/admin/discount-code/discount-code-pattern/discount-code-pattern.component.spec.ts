import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodePatternComponent } from './discount-code-pattern.component';

describe('DiscountCodePatternComponent', () => {
  let component: DiscountCodePatternComponent;
  let fixture: ComponentFixture<DiscountCodePatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodePatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
