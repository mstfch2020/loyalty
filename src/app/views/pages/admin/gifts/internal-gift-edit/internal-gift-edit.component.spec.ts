import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalGiftEditComponent } from './internal-gift-edit.component';

describe('InternalGiftEditComponent', () => {
  let component: InternalGiftEditComponent;
  let fixture: ComponentFixture<InternalGiftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalGiftEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalGiftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
