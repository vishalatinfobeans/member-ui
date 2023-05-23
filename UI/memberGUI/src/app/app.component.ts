import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'memberGUI';
  sidebarExpanded = true;
  isLoggedIn$!: Observable<boolean>;
  constructor(private router: Router, private authService: AuthService, private translate: TranslateService){
    this.isLoggedIn$ = this.authService.isLoggedIn;
    translate.addLangs(['en', 'klingon']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

}
