import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CircularProgressBarComponent } from './circular-progress-bar/circular-progress-bar.component';
import { NavbarBadgeComponent } from './navbar-badge/navbar-badge.component';
import { SecondaryNavbarComponent } from './secondary-navbar/secondary-navbar.component';
import { FormModalComponent } from './form-modal/form-modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoModalComponent } from './info-modal/info-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    CircularProgressBarComponent,
    NavbarBadgeComponent,
    SecondaryNavbarComponent,
    FormModalComponent,
    InfoModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbDropdownModule,
    ReactiveFormsModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    FormModalComponent,
    InfoModalComponent
  ],

})
export class SharedModule { }
