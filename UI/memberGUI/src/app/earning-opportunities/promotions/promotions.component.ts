import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Promotions } from './models';
import * as moment from 'moment';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  
  promotions!: [Promotions];
  languageSelected: string = 'en';
  currentDate = (new Date()).getTime();

  constructor(private apiService: ApiService) {
    this.apiService.getSelectedLanguage?.subscribe((data:any)=>{
      this.languageSelected = data
      this.getPromotions(data);
    })
  }

  ngOnInit(): void {
    this.getPromotions(this.languageSelected);
  }

  getPromotions(lan:string) {
    this.apiService.GET(`promotions?sort=display_order&locale=${lan}`).subscribe(res => { 
      this.promotions = res.data;
      this.promotions.map((card: any) => {
        let expiryDate = new Date(card.attributes.display_expiry_flag);
        card.attributes.expiring_soon = moment(expiryDate).subtract(card.attributes.expires_in, 'days').format('x');
        card.attributes.display_expiry_flag = expiryDate.getTime();
      }); 
    });
  }

}
