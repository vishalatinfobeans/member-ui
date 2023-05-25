import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable, Subject } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})



export class ApiService {
  // selectedlanguage!:Subject<any>;
  baseUrl = 'http://localhost:1337/api/';
  public selectedlanguage = new BehaviorSubject<string>('en');

  get getSelectedLanguage() { 
    return this.selectedlanguage.asObservable();
  }

  constructor(public http: HttpClient) { }

  GET(url: any) {
    return this.http.get<any>(this.baseUrl + url);
  }

  setLanguage(lan: any) {
    this.selectedlanguage.next(lan);
  }

  
}
