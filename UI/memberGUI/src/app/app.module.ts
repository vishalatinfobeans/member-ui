import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PromotionsComponent } from './dashboard/promotions/promotions.component';
import { InfoSidePanelComponent } from './dashboard/info-side-panel/info-side-panel.component';
import { GridComponent } from './dashboard/grid/grid.component';
import { TabsComponent } from './dashboard/tabs/tabs.component';
import { RedemptionCatalogComponent } from './redemption-catalog/redemption-catalog.component';
import { GiftCardDetailsComponent } from './redemption-catalog/gift-card-details/gift-card-details.component';
import { GiftCardGridComponent } from './redemption-catalog/gift-card-grid/gift-card-grid.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PromotionsComponent,
    InfoSidePanelComponent,
    GridComponent,
    TabsComponent,
    RedemptionCatalogComponent,
    GiftCardDetailsComponent,
    GiftCardGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule,
    AuthenticationModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  exports: [TranslateModule],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
