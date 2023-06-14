import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-review-redemption-modal',
  templateUrl: './review-redemption-modal.component.html',
  styleUrls: ['./review-redemption-modal.component.scss']
})
export class ReviewRedemptionModalComponent {
  @Input() modalRef!: NgbModalRef;
  @Input() formData!: any;
  giftCard!: any
  faceValue!: any;
  totalAmount: any;
  constructor(public dataService: DataService,private apiService: ApiService) {
    this.dataService.redemption$.subscribe((redemption) => {
      this.giftCard = redemption;
    });
    this.faceValue = this.dataService.selectedCardItem?.faceValue
    if (this.faceValue == null) {
      this.faceValue = this.dataService.selectedCardItem?.minValue
    }
    this. getAccountData()
  }
  getAccountData(){
    this.apiService.GET(`account-transactions?fields[0]=amount`).subscribe(res=>{

      this.totalAmount = res.data.reduce(((total:number, amountData:any)=>{return total + amountData.attributes.amount}),0)

    });
  }
  closeModal = () => {
    this.modalRef?.close();
    const body = document.querySelector('body');
    if (body)
      body.style.overflow = "auto !important";
  }
  handleFormSubmit() {
    this.dataService.redeemRequest(this.formData);
    this.closeModal();
  }
}
