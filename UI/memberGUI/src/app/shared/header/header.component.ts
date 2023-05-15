import { Component, Input } from '@angular/core';
import { AuthenticateService } from 'src/app/authentication/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  constructor(public authService:AuthenticateService){
  }
}
