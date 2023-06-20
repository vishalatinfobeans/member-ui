import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Promotions } from './models';
import * as moment from 'moment';


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent {
  
  promotions!: [Promotions];
  languageSelected = 'en';
  currentDate = (new Date()).getTime();
  gatekeeperPromotions: any;
  gatekeeperStatus: any; 
  progressValue = 0;
  progressInputValue = 0;
  allActivities = [];

  constructor(private apiService: ApiService) {
    this.apiService.getSelectedLanguage?.subscribe((data:any)=>{
      this.languageSelected = data
    })
    this.apiService.getUpdatedPromotion?.subscribe((data:any)=>{
      // this.languageSelected = data
      console.log("inside constructor when subscribing getUpdatedPromotion ", this.languageSelected);
      this.gatekeeperPromotions = {};
      this.gatekeeperStatus = {};
      this.getAllActivities();
      this.getPromotions(this.languageSelected);
    })
  }

  // ngOnInit(): void {}

  getAllActivities() {
    this.apiService.GET(`promotion-activities?populate=activity_id&populate=promotion_id`).subscribe(res => {
     this.allActivities = res.data.map((attribute: any) => attribute);
    })
     
     
  }

  getPromotions(lan:string) {
    this.gatekeeperPromotions = {};
    this.gatekeeperStatus = {};
    this.apiService.GET(`promotion-displays?sort=display_order&locale=${lan}&populate=survey_question&populate=promotion_id`).subscribe(res => { 
      this.promotions = res.data;
      // console.log("this.promotions ", this.promotions);
      this.promotions.map((card: any) => {
        card.attributes.video_url = card.attributes.video_url || "";
        const expiryDate = new Date(card.attributes.display_expiry_flag);
        card.attributes.expiring_soon = moment(expiryDate).subtract(card.attributes.expires_in, 'days').format('x');
        card.attributes.display_expiry_flag = expiryDate.getTime();
        card.attributes.disablePromotion = card.attributes.progress_type == "single step" && card.attributes.no_of_attempts >= card.attributes.max_count
        card.attributes.disablePromotion = card.attributes.progress_type == "multi step" && card.attributes.progress_input_value <= 0;
        if (card.attributes.progress_type == "multi step") {
          this.progressInputValue = parseInt(card.attributes.progress_input_value || 0);
          this.progressValue = parseInt(card.attributes.progress_input_value || 0);
        
        }
        const { attributes: { promotion_id : promotionsData}} = card; 
        // console.log({promotionsData});
        const {data : { id: promotionId, attributes: promotionDetails }} = promotionsData;
        card.attributes.promotion_id = promotionId;
        card.attributes.promotion_details = promotionDetails;
        if (card.attributes.status == "complete") {
          card.attributes.display_order = parseInt(card.attributes.display_order) + this.promotions.length; 
        }
        this.getActivities(card);
        
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
      console.log(this.promotions);
      this.promotions.sort((a: any, b: any) => { return a.attributes.display_order - b.attributes.display_order;})
      this.promotions.map((card: any) => {
        if(this.currentDate > card.attributes.display_expiry_flag) {
          const {attributes:{display_order}} = this.promotions[this.promotions.length-1];
          card.attributes.display_order = parseInt(display_order) + 1;
        }
      })
      this.promotions.sort((a: any, b: any) => { return a.attributes.display_order - b.attributes.display_order;})
      

      // console.log(this.gatekeeperPromotions); 
      // console.log(this.gatekeeperStatus);
    });
  }

  reportSurvey(surveyQuestions: any, promotionData: any) {
    
    const promotionStatus = this.validateActivity(promotionData);

    console.log(promotionStatus)

    const reqBody = {
      "data": {
        "type": "reward",
        "date": new Date(),
        "account_id": 1,
        "member_id": 1,
        "promotion_id": promotionData.attributes.promotion_id,
        "amount": promotionData.attributes.display_amount,
        "description": "",
        "metadata": JSON.stringify(surveyQuestions),
        "reward_id": 1,
        "redemption_id": 1,
        "is_reverserd": false,
        "status": promotionStatus
      }
    }
    // console.log({surveyQuestions});
    // console.log({promotionData});
    let reqBodyPromotion = {
      "data": {
        "status": promotionStatus,
        "no_of_attempts": promotionData.attributes.no_of_attempts+1,
        "progress_input_value": promotionData.attributes.progress_input_value
      }
    }
    if(promotionData.attributes.progress_type=="multi step") { 
      reqBodyPromotion = {
        "data": {
          "status": promotionStatus,
          "no_of_attempts": promotionData.attributes.no_of_attempts,
          "progress_input_value": promotionData.attributes.progress_input_value
        }
      }
    }
    

    if(promotionData.attributes.status != "complete"){
      this.apiService.POST("activities", reqBody).subscribe(res=>{
        this.apiService.POST("promotion-activities?populate=activity_id&populate=promotion_id", {"data": {"activity_id": {"connect": [res.data.id]}, "promotion_id": {"connect": [promotionData.id]}}}).subscribe(res=>{
          console.log("-------------", res);});
          reqBody.data.status = "Success";
          if(promotionStatus == 'complete') this.apiService.POST("account-transactions", reqBody).subscribe(res=>console.log(res));
          
          this.apiService.PUT(`promotion-displays/${promotionData.id}`, reqBodyPromotion).subscribe(res=>{
            this.apiService.setUpdatedPromotion(promotionData);
          });
        });
    }
  }

  validateActivity(promotion: any) {
    
    const {attributes: {progress_type, progress_input_value, max_count}} = promotion;
    let status = "pending";
    console.log({progress_input_value, max_count});

    switch(progress_type) {
      
      case "single step": 
        status = "complete";
        break;
      
      case "multi step":
        if (parseInt(progress_input_value) > parseInt(max_count)) status = "complete";
        break;
      
      case "multi step automated": 
        break;

      default:
    }
    console.log({status});
    return status;
  }

  progressChange(e: any, promotion: any) {
    promotion.attributes.disablePromotion = false;
    this.progressValue = parseInt(e.target.value) + (this.progressValue || 0) ;
    this.progressInputValue = this.progressValue;
    promotion.attributes.progress_input_value = this.progressValue;
  }

  // progressChange(e: any, promotion: any) {
  //   promotion.attributes.disablePromotion = false;
  //   console.log(e.target.value);
  //   this.progressValue = e.target.value > this.progressValue ? e.target.value : this.progressValue ;
  //   console.log(this.progressValue)
  //   this.progressInputValue = this.progressValue;
  //   promotion.attributes.progress_input_value = this.progressValue;
  //   console.log("progressInputValue ", this.progressInputValue);
  // }

  getActivities(card: any) {
    
    if(!card.attributes.activityCount) card.attributes.activityCount = 0;
    if (card.attributes.status == "complete") return;
    this.allActivities.forEach((attribute: any) => {
      if (attribute.attributes.promotion_id.data?.id == card?.id) {
        card.attributes.activityCount = card.attributes.activityCount + 1;
      }
      if (card.attributes.activityCount == card.attributes.max_count) {
        this.reportSurvey({}, card);
        card.attributes.status = "complete";
      }
    })
  }


  // getActivities(card: any) {
  //   console.log({card})

  //   if(!card.attributes.activityCount) card.attributes.activityCount = 0;
  //   console.log(card.attributes.activityCount);
  //   console.log(card.attributes.max_count); 
  //   if (card.attributes.status == "complete") return;

  //   this.apiService.GET(`promotion-activities?populate=activity_id&populate=promotion_id`).subscribe(res => {
  //     // console.log(res);
  //     res.data.map((attribute: any) => {
  //       // console.log(attribute.attributes.promotion_id.data.id);
  //       if (attribute.attributes.promotion_id.data.id == card.id) {
  //         card.attributes.activityCount = card.attributes.activityCount + 1;
  //       }; 
  //       if (card.attributes.activityCount == card.attributes.max_count) {
  //         this.reportSurvey({}, card);
  //       }
  //     })
  //    })
    
  // }

}