import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  activeTab: string = 'tab1';

  openTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
