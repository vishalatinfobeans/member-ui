import { Component } from '@angular/core';
import { AuthenticateService } from './authentication/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'memberGUI';
  isLogin:boolean=false;
  constructor(private service:AuthenticateService)
  {
    this.isLogin=service.isLogin
  }
  setIsLogin=(status:boolean)=>{
  this.isLogin=status;
  }
}
