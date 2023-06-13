import { Injectable } from '@angular/core';
import { Redemption, redemptionForm } from './model';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { MessageModalComponent } from '../shared/message-modal/message-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  redemptionSubject = new BehaviorSubject<any>(null);
  redemption$ = this.redemptionSubject.asObservable();
  selectedCardItem!: any;
  constructor(private apiService: ApiService, private modalService: NgbModal) {

  }
  setGigtCardDetails(redeption: any) {
    this.redemptionSubject.next(redeption);
  }
  setSelectedCardItem(item: any) {
    this.selectedCardItem = item;

  }

  redeemRequest = (submitData: redemptionForm) => {
    let faceValue = this.selectedCardItem?.faceValue
    if (faceValue == null) {
      faceValue = this.selectedCardItem?.minValue
    }
    let redemptionDetails = {
      "recipient": {
        "firstName": submitData.firstName,
        "lastName": submitData.lastName,
        "email": submitData.email
      },
      "externalRefID": this.generateUniqueKey(submitData.email)
      ,
      "amount": faceValue
      ,
      "customerIdentifier": "foocust",
      "accountIdentifier": "fooacct",
      "utid": this.selectedCardItem.utid,

      "sendEmail": true

    }
    this.apiService.createOrderInTango(redemptionDetails).subscribe((response) => {
      console.log(response)
      this.openSuccessModal(response.referenceOrderID, submitData.email);
      const reqBody = {
        "data": {
          "type": "",
          "date": new Date(),
          "account_id": 1,
          "member_id": 1,
          "promotion_id": "",
          "amount": -faceValue,
          "description": "",
          "reward_id": "",
          "redemption_id": response.referenceOrderID,
          "is_reverserd": false,
          "status": "Success",
          "survey_response": ""
        }
      }
      this.apiService.POST("account-transactions", reqBody).subscribe(res=>console.log(res));
    });
  }
  generateUniqueKey(email: string) {
    const timestamp = Date.now();
    const key = `${timestamp}-${email}`;
    return key;
  }

  openSuccessModal(redemptionId: string, email: string) {
    const modalRef = this.modalService.open(MessageModalComponent, { size: 'sm' });
    modalRef.componentInstance.title = 'Redemption Successful!';
    modalRef.componentInstance.message = `  Thank you! Your transaction has been successfully processed.
    An email with redemption instructions will be delivered to `+ email + ` Your Redemption ID is ` + redemptionId;
    modalRef.componentInstance.imgUrl = "https://lh3.googleusercontent.com/-Zxh4srAEtU0/Wp0cZV-PJuI/AAAAAAAAD4E/En5x5c53s44jzvG8M0sSyFZXoRhGXfBzwCL0BGAYYCw/h100/2018-03-05.png"
    modalRef.componentInstance.isSuccessfull = true
    modalRef.componentInstance.modalRef = modalRef;

  }
  openUnSuccessModal() {

    const modalRef = this.modalService.open(MessageModalComponent, { size: 'sm' });
    modalRef.componentInstance.title = 'Redemption Failed';
    modalRef.componentInstance.message = `  We’re sorry, there has been an issue completing your transaction.  Please try again later.`;
    modalRef.componentInstance.imgUrl = "https://lh3.googleusercontent.com/-ApBj8d4WL1E/Wp0fJeAD6jI/AAAAAAAAD4M/Dh6l_UiA64kln8PS-1SaDQFuhb9KJL40gCL0BGAYYCw/h100/2018-03-05.png"
    modalRef.componentInstance.isSuccessfull = true
    modalRef.componentInstance.modalRef = modalRef;

  }


}
function subscribe(arg0: (response: any) => void) {
  throw new Error('Function not implemented.');
}

