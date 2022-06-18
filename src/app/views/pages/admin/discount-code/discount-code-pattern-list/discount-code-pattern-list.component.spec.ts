import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodePatternListComponent } from './discount-code-pattern-list.component';

describe('DiscountCodePatternListComponent', () => {
  let component: DiscountCodePatternListComponent;
  let fixture: ComponentFixture<DiscountCodePatternListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodePatternListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodePatternListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
