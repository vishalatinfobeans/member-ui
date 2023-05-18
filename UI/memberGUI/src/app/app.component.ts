import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'memberGUI';
  sidebarExpanded = true;
  isLoggedIn$!: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService){
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }




}
