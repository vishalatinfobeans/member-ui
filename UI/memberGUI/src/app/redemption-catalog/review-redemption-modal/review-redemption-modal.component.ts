import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';

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
  constructor(public dataService: DataService) {
    this.dataService.redemption$.subscribe((redemption) => {
      this.giftCard = redemption;
    });
    this.faceValue = this.dataService.selectedCardItem?.faceValue
    if (this.faceValue == null) {
      this.faceValue = this.dataService.selectedCardItem?.minValue
    }
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
