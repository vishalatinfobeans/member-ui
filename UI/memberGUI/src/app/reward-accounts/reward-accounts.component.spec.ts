import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardAccountsComponent } from './reward-accounts.component';

describe('RewardAccountsComponent', () => {
  let component: RewardAccountsComponent;
  let fixture: ComponentFixture<RewardAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
