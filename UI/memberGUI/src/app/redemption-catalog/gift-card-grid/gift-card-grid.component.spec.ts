import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardGridComponent } from './gift-card-grid.component';

describe('GiftCardGridComponent', () => {
  let component: GiftCardGridComponent;
  let fixture: ComponentFixture<GiftCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCardGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
