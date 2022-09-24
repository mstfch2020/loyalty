import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalGiftListComponent } from './internal-gift-list.component';

describe('InternalGiftListComponent', () => {
  let component: InternalGiftListComponent;
  let fixture: ComponentFixture<InternalGiftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalGiftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalGiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
