import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryGiftListComponent } from './lottery-gift-list.component';

describe('LotteryGiftListComponent', () => {
  let component: LotteryGiftListComponent;
  let fixture: ComponentFixture<LotteryGiftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryGiftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryGiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
