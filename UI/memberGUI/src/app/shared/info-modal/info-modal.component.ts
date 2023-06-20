import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/redemption-catalog/data.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent {
  @Input() message: any;
  @Input() title: any;
  @Input() modalRef!: NgbModalRef;
  closeModal = () => {
    this.modalRef?.close();
    const body = document.querySelector('body');
    if (body) body.style.overflow = 'auto !important';
  };
}
