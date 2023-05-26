import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { PageNotFoundComponent } from './authentication/page-not-found/page-not-found.component';
import { EarningOpportunitiesComponent } from './earning-opportunities/earning-opportunities.component';
import { AuthGuard } from './authentication/auth.guard';
import { RedemptionCatalogComponent } from './redemption-catalog/redemption-catalog.component';
import { HomeComponent } from './home/home.component';
import { ActivityHistoryComponent } from './activity-history/activity-history.component';
import { RewardAccountsComponent } from './reward-accounts/reward-accounts.component';

const routes: Routes = [
  { path: '', redirectTo: '/earning-opportunities', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]} ,
  { path: 'earning-opportunities', component: EarningOpportunitiesComponent, canActivate: [AuthGuard]},
  { path: 'activity-history', component: ActivityHistoryComponent, canActivate: [AuthGuard] },
  { path: 'redemption-catalog', component: RedemptionCatalogComponent,canActivate: [AuthGuard]},
  { path: 'reward-accounts', component: RewardAccountsComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
