import { Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-review-redemption-modal',
  templateUrl: './review-redemption-modal.component.html',
  styleUrls: ['./review-redemption-modal.component.scss'],
})
export class ReviewRedemptionModalComponent implements OnInit {
  @Input() modalRef!: NgbModalRef;
  @Input() formData!: any;
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
  };
  giftCard!: any;
  faceValue!: any;
  totalAmount: any;

  constructor(public dataService: DataService, private apiService: ApiService) {
    this.apiService.getSelectedLanguage?.subscribe((data: any) => {
      this.updateLables(data);
    });
    this.dataService.redemption$.subscribe((redemption) => {
      this.giftCard = redemption;
    });

    if (this.dataService.selectedCardItem?.faceValue == null) {
      this.faceValue = this.dataService.finalAmount;
    } else {
      this.faceValue = this.dataService.selectedCardItem?.faceValue;
    }
    this.getAccountData();
  }
  ngOnInit(): void {
    this.apiService.getSelectedLanguage?.subscribe((data: any) => {
      this.updateLables(data);
    });
  }
  updateLables(lan: any) {
    this.apiService.GET(`redemption?locale=${lan}`).subscribe((data: any) => {
      const {
        data: { attributes },
      } = data;

      this.labels = attributes;
    });
  }
  getAccountData() {
    this.apiService
      .GET(`account-transactions?fields[0]=amount`)
      .subscribe((res) => {
        this.totalAmount = res.data.reduce((total: number, amountData: any) => {
          return total + amountData.attributes.amount;
        }, 0);
      });
  }
  closeModal = () => {
    this.modalRef?.close();
    const body = document.querySelector('body');
    if (body) body.style.overflow = 'auto !important';
  };
  handleFormSubmit() {
    this.dataService.redeemRequest(this.formData);
    this.closeModal();
  }
}
