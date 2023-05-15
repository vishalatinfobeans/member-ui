import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../authentication/auth.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private authService: AuthService) {}
   
  isExpanded: boolean = false;

  ngOnInit(): void {
    
  }

  handleSidebarToggle=()=>{
    this.isExpanded=!this.isExpanded;
  }

  logout() {
    this.authService.logout();
  }
}
