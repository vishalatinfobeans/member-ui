import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRedemptionModalComponent } from './review-redemption-modal.component';

describe('ReviewRedemptionModalComponent', () => {
  let component: ReviewRedemptionModalComponent;
  let fixture: ComponentFixture<ReviewRedemptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRedemptionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRedemptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
