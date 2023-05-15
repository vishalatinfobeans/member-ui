import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
isLogin:boolean=false
  constructor() { }

  setIsLogin(isLogin:boolean)
  {
    this.isLogin=isLogin;
  }
}
