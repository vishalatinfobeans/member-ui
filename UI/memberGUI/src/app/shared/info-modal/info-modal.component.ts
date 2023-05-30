import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {

  @Input() title: string = "";
  @Input() redemptionID: string | undefined;
  @Input() emailAddress: string | undefined;
  @Input() type!: string;

}
