import { Component, HostListener, OnInit } from '@angular/core';
import { Redemption } from './model';

@Component({
  selector: 'app-redemption-catalog',
  templateUrl: './redemption-catalog.component.html',
  styleUrls: ['./redemption-catalog.component.scss']
})
export class RedemptionCatalogComponent  {
  selectedTab: string = 'tab1';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}







