import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  @Input() message!: string;
  @Input() title!: string;
  @Input() imgUrl!: string;
  @Input() isSuccessfull: boolean = true
  @Input() modalRef!: NgbModalRef;
  constructor(private modalService: NgbModal) { }
  close = () => {
    this.modalRef.close();
    const body = document.querySelector('body');
    if (body)
      body.style.overflow = "auto !important";

  }
}
