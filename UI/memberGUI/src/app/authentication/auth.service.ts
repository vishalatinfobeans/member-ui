import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    let user = window.atob(localStorage.getItem("userInfo") || '');
    if(user != "") {
      const sessionDetails = JSON.parse(user);
      this.loggedIn.next(sessionDetails.status);
    }
    console.log(" in check login ", this.loggedIn.subscribe(val => console.log(val)));  
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router
  ) {}

  login(user: any){
    if (user.email !== '' && user.password !== '' ) { // {3}
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
