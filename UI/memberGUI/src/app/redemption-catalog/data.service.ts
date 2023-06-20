import { Injectable, OnInit } from '@angular/core';
import { Redemption, redemptionForm } from './model';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { MessageModalComponent } from '../shared/message-modal/message-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  redemptionSubject = new BehaviorSubject<any>(null);
  redemption$ = this.redemptionSubject.asObservable();
  selectedCardItem!: any;
  finalAmount!: any;
  labels = {
    account_details: 'Account Details',
    card_amount: 'Card Amount',
    card_delivery_Info: 'Delivery Information',
    card_discription: 'Card Description',
    card_name: 'Gift Card Name',
    card_overview: 'Card Overview',
    card_points: 'Points',
    card_terms: 'Terms & Conditions',
    card_type: 'Card Type',
    card_value: 'Card Value',
    checkout_reedem: 'Checkout Redemption',
    close: 'Close',
    confirm_email: 'Confirm Email',
    confirm_email_required: 'Confirm Email Required',
    createdAt: '2023-06-16T10:33:51.754Z',
    current_balance: 'Current Balance\t',
    digital_card: 'Digital Gift Card',
    digital_form_name: 'Digital Redemption',
    email: 'Email',
    email_not_matched: 'Confirm Email is mismatch',
    email_required: 'Email Required',
    final_balance: 'Final Balance',
    first_name: 'First Name',
    first_name_required: 'First Name Required',
    gift_amount: 'Gift Amount',
    invalid_email: 'Email is Invalid',
    invalid_phone: 'Phone Number is Invalid',
    last_name: 'Last Name',
    last_name_required: 'Last Name Required',
    name: 'Name',
    phone_number: 'Phone ',
    phone_number_required: 'Phone Number Required',
    redemption_review: 'Redemption Review',
    redemption_sucess: 'Redemption Successful',
    reedem: 'Reedem',
    user_details: 'User Details',
    redemption_fail: 'Redemption Fail',
  };
  constructor(private apiService: ApiService, private modalService: NgbModal) {
    this.apiService.getSelectedLanguage?.subscribe((data: any) => {
      this.setRedemptionLabel(data);
    });
  }
  ngOnInit(): void {
    this.apiService.getSelectedLanguage?.subscribe((data: any) => {
      this.setRedemptionLabel(data);
    });
  }

  setRedemptionLabel = (lan: string) => {
    this.apiService.GET(`redemption?locale=${lan}`).subscribe((data: any) => {
      const {
        data: { attributes },
      } = data;
      console.log(data);
      this.labels = attributes;
    });
  };

  setGigtCardDetails(redeption: any) {
    this.redemptionSubject.next(redeption);
  }
  setSelectedCardItem(item: any) {
    this.selectedCardItem = item;
  }

  redeemRequest = (submitData: redemptionForm) => {
    const reqBody = {
      data: {
        type: '',
        date: new Date(),
        account_id: 1,
        member_id: 1,
        promotion_id: null,
        amount: -this.finalAmount,
        description: '',
        reward_id: null,
        is_reverserd: false,
        survey_response: '',
      },
    };
    this.saveTransectionData(reqBody, submitData);
  };

  saveTransectionData = (reqBody: any, submitData: redemptionForm) => {
    let amount = this.selectedCardItem?.faceValue;
    if (amount == null) {
      amount = this.finalAmount;
    }
    let redemptionDetails = {
      recipient: {
        firstName: submitData.firstName,
        lastName: submitData.lastName,
        email: submitData.email,
      },
      externalRefID: this.generateUniqueKey(submitData.email),
      amount: amount,
      customerIdentifier: 'foocust',
      accountIdentifier: 'fooacct',
      utid: this.selectedCardItem.utid,
      sendEmail: true,
    };
    reqBody.data['redemption_request'] = redemptionDetails;
    reqBody.data['status'] = 'Success';
    this.apiService
      .POST('account-transactions', reqBody)
      .subscribe((savedResponse) => {
        this.apiService.createOrderInTango(redemptionDetails).subscribe(
          (tangoResponse) => {
            this.apiService.setUpdatedRedemption('');
            reqBody.data['redemption_response'] = tangoResponse;

            this.apiService
              .PUT('account-transactions/' + savedResponse.data.id, reqBody)
              .subscribe((updatedData) => {
                console.log(updatedData);
              });
            this.openSuccessModal(
              tangoResponse.referenceOrderID,
              submitData.email
            );
          },
          (error: HttpErrorResponse) => {
            reqBody.data['status'] = 'Failed';
            reqBody.data['redemption_request'] = null;
            reqBody.data['redemption_response'] = error;
            reqBody.data['amount'] = this.finalAmount;
            this.apiService
              .POST('account-transactions', reqBody)
              .subscribe((errorEntry) => {
                console.log(errorEntry);
              });
            this.openUnSuccessModal();
          }
        );
      });
  };
  generateUniqueKey(email: string) {
    const timestamp = Date.now();
    const key = `${timestamp}-${email}`;
    return key;
  }

  openSuccessModal(redemptionId: string, email: string) {
    const modalRef = this.modalService.open(MessageModalComponent, {
      size: 'sm',
    });
    modalRef.componentInstance.title = this.labels.redemption_sucess;
    modalRef.componentInstance.closeTitle = this.labels.close;
    modalRef.componentInstance.message =
      `  Thank you! Your transaction has been successfully processed.
    An email with redemption instructions will be delivered to ` +
      email +
      ` Your Redemption ID is ` +
      redemptionId;
    modalRef.componentInstance.imgUrl =
      'https://lh3.googleusercontent.com/-Zxh4srAEtU0/Wp0cZV-PJuI/AAAAAAAAD4E/En5x5c53s44jzvG8M0sSyFZXoRhGXfBzwCL0BGAYYCw/h100/2018-03-05.png';
    modalRef.componentInstance.isSuccessfull = true;
    modalRef.componentInstance.modalRef = modalRef;
  }
  openUnSuccessModal() {
    const modalRef = this.modalService.open(MessageModalComponent, {
      size: 'sm',
    });
    modalRef.componentInstance.title = this.labels.redemption_fail;
    modalRef.componentInstance.message = `  We’re sorry, there has been an issue completing your transaction.  Please try again later.`;
    modalRef.componentInstance.imgUrl =
      'https://lh3.googleusercontent.com/-ApBj8d4WL1E/Wp0fJeAD6jI/AAAAAAAAD4M/Dh6l_UiA64kln8PS-1SaDQFuhb9KJL40gCL0BGAYYCw/h100/2018-03-05.png';
    modalRef.componentInstance.isSuccessfull = false;
    modalRef.componentInstance.closeTitle = this.labels.close;
    modalRef.componentInstance.modalRef = modalRef;
  }
}
function subscribe(arg0: (response: any) => void) {
  throw new Error('Function not implemented.');
}
