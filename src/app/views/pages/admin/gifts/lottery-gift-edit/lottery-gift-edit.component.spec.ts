import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryGiftEditComponent } from './lottery-gift-edit.component';

describe('LotteryGiftEditComponent', () => {
  let component: LotteryGiftEditComponent;
  let fixture: ComponentFixture<LotteryGiftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryGiftEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryGiftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
