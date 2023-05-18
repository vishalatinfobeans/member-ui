import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { PromotionsComponent } from './dashboard/promotions/promotions.component';
import { InfoSidePanelComponent } from './dashboard/info-side-panel/info-side-panel.component';
import { GridComponent } from './dashboard/grid/grid.component';
import { TabsComponent } from './dashboard/tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PromotionsComponent,
    InfoSidePanelComponent,
    GridComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    AuthenticationModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
