import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionCatalogComponent } from './redemption-catalog.component';

describe('RedemptionCatalogComponent', () => {
  let component: RedemptionCatalogComponent;
  let fixture: ComponentFixture<RedemptionCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedemptionCatalogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RedemptionCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
