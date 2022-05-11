import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeGeneratedListComponent } from './discount-code-generated-list.component';

describe('DiscountCodeGeneratedListComponent', () => {
  let component: DiscountCodeGeneratedListComponent;
  let fixture: ComponentFixture<DiscountCodeGeneratedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodeGeneratedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodeGeneratedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
