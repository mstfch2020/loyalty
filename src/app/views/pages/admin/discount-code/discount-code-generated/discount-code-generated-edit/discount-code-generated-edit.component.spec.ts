import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCodeGeneratedEditComponent } from './discount-code-generated-edit.component';

describe('DiscountCodeGeneratedEditComponent', () => {
  let component: DiscountCodeGeneratedEditComponent;
  let fixture: ComponentFixture<DiscountCodeGeneratedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCodeGeneratedEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCodeGeneratedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
