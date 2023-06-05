import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/redemption-catalog/data.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {

  @Input() message: any
  @Input() title: any
  @Input() id: any

}
