import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalGiftListComponent } from './external-gift-list.component';

describe('ExternalGiftListComponent', () => {
  let component: ExternalGiftListComponent;
  let fixture: ComponentFixture<ExternalGiftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalGiftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalGiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
