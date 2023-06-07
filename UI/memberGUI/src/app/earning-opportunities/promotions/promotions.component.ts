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
  gatekeeperPromotions: any;
  gatekeeperStatus: any; 
  progressValue = 0;
  progressInputValue = 0;

  constructor(private apiService: ApiService) {
    this.apiService.getSelectedLanguage?.subscribe((data:any)=>{
      this.languageSelected = data
      this.getPromotions(data);
    })
    this.apiService.getUpdatedPromotion?.subscribe((data:any)=>{
      // this.languageSelected = data
      console.log("inside constructor when subscribing ", this.languageSelected);
      this.gatekeeperPromotions = {};
    this.gatekeeperStatus = {};
      this.getPromotions(this.languageSelected);
    })
  }

  ngOnInit(): void {
    this.getPromotions(this.languageSelected);
  }

  getPromotions(lan:string) {
    this.gatekeeperPromotions = {};
    this.gatekeeperStatus = {};
    this.apiService.GET(`promotion-displays?sort=display_order&locale=${lan}&populate=survey_question&populate=promotion_id`).subscribe(res => { 
      this.promotions = res.data;
      // console.log("this.promotions ", this.promotions);
      this.promotions.map((card: any) => {
        let expiryDate = new Date(card.attributes.display_expiry_flag);
        card.attributes.expiring_soon = moment(expiryDate).subtract(card.attributes.expires_in, 'days').format('x');
        card.attributes.display_expiry_flag = expiryDate.getTime();
        card.attributes.disablePromotion = card.attributes.progress_type == "single step" && card.attributes.no_of_attempts >= card.attributes.max_count
        card.attributes.disablePromotion = card.attributes.progress_type == "multi step" && card.attributes.progress_input_value <= 0;
        this.progressInputValue = card.attributes.progress_input_value;
        this.progressValue = card.attributes.progress_input_value;
        const { attributes: { promotion_id : promotionsData}} = card; 
        // console.log({promotionsData});
        const {data : { id: promotionId, attributes: promotionDetails }} = promotionsData;
        card.attributes.promotion_id = promotionId;
        card.attributes.promotion_details = promotionDetails;
        
        if (card.attributes.is_gatekeeper) {
          this.gatekeeperStatus[card.id] = {status: card.attributes.status, title: card.attributes.title};  
        } else {
          this.gatekeeperStatus[card.id] = {status: 'noGatekeeper'};
        }
        this.gatekeeperPromotions[card.id] = {gateKeeperId: card.attributes.gatekeeper_promotion_id, status: card.attributes.gatekeeper_promotion_id ? this.gatekeeperStatus[card.attributes.gatekeeper_promotion_id]?.status : 'noGatekeeper', title: this.gatekeeperStatus[card.attributes.gatekeeper_promotion_id]?.title}
        // if (card.attributes.gatekeeper_promotion_id) {
        //   console.log("card.attributes.gatekeeper_promotion_id ", card.attributes.gatekeeper_promotion_id);

        //   this.gatekeeperPromotions[`${card.attributes.gatekeeper_promotion_id}`] ? (this.gatekeeperPromotions[`${card.attributes.gatekeeper_promotion_id}`].includes(card.id)? "": this.gatekeeperPromotions[`${card.attributes.gatekeeper_promotion_id}`].push(card.id)) : (this.gatekeeperPromotions[`${card.attributes.gatekeeper_promotion_id}`] = [card.id]);
        // } else {
        //   // console.log(card.attributes.gatekeeper)
        // }
        // console.log(card);
      });
      // console.log(this.gatekeeperPromotions); 
      // console.log(this.gatekeeperStatus);
    });
  }

  reportSurvey(surveyQuestions: any, promotionData: any) {
    const reqBody = {
      "data": {
        "type": "",
        "date": new Date(),
        "account_id": 1,
        "member_id": 1,
        "promotion_id": promotionData.attributes.promotion_id,
        "amount": promotionData.attributes.display_amount,
        "description": "",
        "reward_id": 1,
        "redemption_id": 1,
        "is_reverserd": false,
        "status": "Success",
        "survey_response": JSON.stringify(surveyQuestions)
      }
    }
    // console.log({surveyQuestions});
    // console.log({promotionData});
    let reqBodyPromotion = {
      "data": {
        "status": "complete",
        "no_of_attempts": promotionData.attributes.no_of_attempts+1,
        "progress_input_value": promotionData.attributes.progress_input_value
      }
    }
    if(promotionData.attributes.progress_type=="multi step") { 
      reqBodyPromotion = {
        "data": {
          "status": "pending",
          "no_of_attempts": promotionData.attributes.no_of_attempts,
          "progress_input_value": promotionData.attributes.progress_input_value
        }
      }
    }
    this.apiService.POST("account-transactions", reqBody).subscribe(res=>console.log(res));
    this.apiService.PUT(`promotion-displays/${promotionData.id}`, reqBodyPromotion).subscribe(res=>{
      this.apiService.setUpdatedPromotion(promotionData);
    });
  }

  progressChange(e: any, promotion: any) {
    promotion.attributes.disablePromotion = false;
    console.log(e.target.value);
    this.progressValue = e.target.value > this.progressValue ? e.target.value : this.progressValue ;
    console.log(this.progressValue)
    this.progressInputValue = this.progressValue;
    promotion.attributes.progress_input_value = this.progressValue;
    console.log("progressInputValue ", this.progressInputValue);
  }

}