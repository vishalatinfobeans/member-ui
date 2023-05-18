import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  promotions!: Observable<any>;
  constructor(public http: HttpClient) { }

  GET(url: any) {
    this.promotions = this.http.get<any>(url);
    // this.http.get(url, { observe: 'response' });
  }
}
