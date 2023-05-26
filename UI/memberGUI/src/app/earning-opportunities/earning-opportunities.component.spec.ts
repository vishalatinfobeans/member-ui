import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningOpportunitiesComponent } from './earning-opportunities.component';

describe('EarningOpportunitiesComponent', () => {
  let component: EarningOpportunitiesComponent;
  let fixture: ComponentFixture<EarningOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningOpportunitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
