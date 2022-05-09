import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodePatternEditComponent } from './discount-code-pattern-edit.component';

describe('DiscountCodePatternEditComponent', () => {
  let component: DiscountCodePatternEditComponent;
  let fixture: ComponentFixture<DiscountCodePatternEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodePatternEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodePatternEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
