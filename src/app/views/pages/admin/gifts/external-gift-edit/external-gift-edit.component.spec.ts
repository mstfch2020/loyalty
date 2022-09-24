import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalGiftEditComponent } from './external-gift-edit.component';

describe('ExternalGiftEditComponent', () => {
  let component: ExternalGiftEditComponent;
  let fixture: ComponentFixture<ExternalGiftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalGiftEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalGiftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
