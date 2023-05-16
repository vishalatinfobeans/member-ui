import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CircularProgressBarComponent } from './circular-progress-bar/circular-progress-bar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    CircularProgressBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent
  ]
})
export class SharedModule { }
