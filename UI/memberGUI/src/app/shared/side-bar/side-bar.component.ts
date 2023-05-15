import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
   
  isExpanded: boolean = false;
  handleSidebarToggle=()=>{
    this.isExpanded=!this.isExpanded;
  }
}
