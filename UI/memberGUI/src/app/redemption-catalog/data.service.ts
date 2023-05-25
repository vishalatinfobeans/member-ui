import { Injectable } from '@angular/core';
import { Redemption } from './model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  redemptionSubject = new BehaviorSubject<any>(null);
  redemption$ = this.redemptionSubject.asObservable();
  setGigtCardDetails(redeption: Redemption) {
    this.redemptionSubject.next(redeption);

  }


}
