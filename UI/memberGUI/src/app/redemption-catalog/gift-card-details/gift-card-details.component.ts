import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from 'src/app/shared/form-modal/form-modal.component';
import { ApiService } from 'src/app/api.service';
import { formFields } from 'src/app/shared/form-modal/model';
import { ReviewRedemptionModalComponent } from '../review-redemption-modal/review-redemption-modal.component';
import { InfoModalComponent } from 'src/app/shared/info-modal/info-modal.component';

@Component({
  selector: 'app-gift-card-details',
  templateUrl: './gift-card-details.component.html',
  styleUrls: ['./gift-card-details.component.scss'],
})
export class GiftCardDetailsComponent implements OnInit {
  @Input() index!: number;
  @Input() divideLenth!: number;
  @Input() detailsIdArray: Set<number> = new Set();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  digitalRedemptionFields!: formFields[];
  count: number = 0;
  countField: any = document.getElementById('count');
  giftCard!: any;
  cardType!: string;
  sliderValue = 0;
  selectedGiftCard!: any;
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
  constructor(
    private apiService: ApiService,
    public dataService: DataService,
    private modalService: NgbModal
  ) {
    this.dataService.redemption$.subscribe((redemption) => {
      this.giftCard = redemption;
      this.selectedGiftCard = redemption;
    });
    this.apiService.getSelectedLanguage?.subscribe((data: any) => {
      this.updateLables(data);
    });
  }

  ngOnInit(): void {
    this.updateLables('en');
  }
  updateLables(lan: any) {
    this.apiService.GET(`redemption?locale=${lan}`).subscribe((data: any) => {
      const {
        data: { attributes },
      } = data;

      this.labels = attributes;
    });
  }
  isDigital = (value: Event) => {
    if (value.isTrusted) {
      this.cardType = 'digital-card';
    }
  };
  isPhysical = (value: Event) => {
    if (value.isTrusted) {
      this.cardType = 'physical-card';
    }
  };
  close = (id: number) => {
    let element = document.getElementById('#' + id.toString());
    if (element != null) element.style.display = 'none';
  };

  increaseCount = () => {
    this.count++;
  };

  decreaseCount = () => {
    if (this.count > 0) {
      this.count--;
    }
  };

  selectedItem = (item: any) => {
    this.dataService.setSelectedCardItem(item);
  };
  updateBubble(event: any, index: number) {
    let element = document.getElementById('amount' + index) as HTMLElement;
    let point = document.getElementById('points' + index) as HTMLElement;
    element.innerHTML = '$' + event.target.value;
    this.dataService.finalAmount = event.target.value;
    point.innerHTML = event.target.value * 100 + ' Points';
  }

  openRedemeForm = () => {
    this.digitalRedemptionFields = [
      {
        fieldType: 'text',
        fieldName: 'firstName',
        label: this.labels?.first_name,
        validation: { required: true },
      },
      {
        fieldType: 'text',
        fieldName: 'lastName',
        label: this.labels?.last_name,
        validation: { required: true },
      },
      {
        fieldType: 'email',
        fieldName: 'email',
        label: this.labels?.email,
        validation: { required: true },
      },
      {
        fieldType: 'email',
        fieldName: 'confirmEmail',
        label: this.labels?.confirm_email,
        validation: { required: true },
      },
      {
        fieldType: 'tel',
        fieldName: 'mobile',
        label: this.labels?.phone_number,
        validation: { required: true },
      },
    ];
    const modalRef = this.modalService.open(FormModalComponent, { size: 'md' });
    modalRef.componentInstance.modalRef = modalRef;
    modalRef.componentInstance.labels = this.labels;
    modalRef.componentInstance.title = this.labels.digital_form_name;
    modalRef.componentInstance.fields = this.digitalRedemptionFields;
    modalRef.componentInstance.onSubmit = this.handleFormSubmit;
  };
  handleFormSubmit(formData: any) {
    const modalRef = this.modalService.open(ReviewRedemptionModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.modalRef = modalRef;
    modalRef.componentInstance.formData = formData;
  }
  openTersAndCondition = () => {
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'md' });
    modalRef.componentInstance.message = this.selectedGiftCard.terms;
    modalRef.componentInstance.title = this.labels.card_terms;
    modalRef.componentInstance.modalRef = modalRef;
  };
  openCardDescription = () => {
    console.log('here');
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'md' });
    console.log('opened');

    modalRef.componentInstance.message = this.selectedGiftCard.description;
    modalRef.componentInstance.title = this.labels.card_discription;
    modalRef.componentInstance.modalRef = modalRef;
  };
}
