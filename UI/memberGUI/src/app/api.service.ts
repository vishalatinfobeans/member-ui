import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getRewardCatalogFromTango() {

    const basicToken = 'UUFQbGF0Zm9ybTI6YXBZUGZUNkhOT05wRFJVajNDTEdXWXQ3Z3ZJSE9OcERSVVlQZlQ2SGo=';
    const headers = new HttpHeaders({
      'authorization': `Basic ${basicToken}`,
      'accept': 'application/json'
    });
    this.http.get('https://integration-api.tangocard.com/raas/v2/catalogs', { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

}
