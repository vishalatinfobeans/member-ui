import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSidePanelComponent } from './info-side-panel.component';

describe('InfoSidePanelComponent', () => {
  let component: InfoSidePanelComponent;
  let fixture: ComponentFixture<InfoSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSidePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
