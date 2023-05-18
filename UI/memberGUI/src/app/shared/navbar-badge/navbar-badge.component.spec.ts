import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBadgeComponent } from './navbar-badge.component';

describe('NavbarBadgeComponent', () => {
  let component: NavbarBadgeComponent;
  let fixture: ComponentFixture<NavbarBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
