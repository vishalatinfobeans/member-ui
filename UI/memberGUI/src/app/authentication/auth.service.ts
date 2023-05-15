import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    let user = window.atob(localStorage.getItem("userInfo") || '');
    if(user != "") {
      const sessionDetails = JSON.parse(user);
      this.loggedIn.next(sessionDetails.status);
    }
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: any){
    if (user.email !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      localStorage.setItem("userInfo", window.btoa(JSON.stringify(({status: true, ...user}))));
      this.router.navigate(['/']);
    }
  }

  logout() {     
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
