import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()  isLogin:boolean =false;
  isLoggedIn$!: Observable<boolean>;
  constructor(private authService: AuthService){
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
