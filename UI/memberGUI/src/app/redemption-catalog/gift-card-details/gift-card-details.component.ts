import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Redemption } from '../model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gift-card-details',
  templateUrl: './gift-card-details.component.html',
  styleUrls: ['./gift-card-details.component.scss']
})
export class GiftCardDetailsComponent implements OnInit {
  @Input() index!: number;
  @Input() divideLenth !: number;
  @Input() detailsIdArray: Set<number> = new Set()
  count: number = 0;
  countField: any = document.getElementById('count');
  giftCard!: Redemption
  cardType!: String;
  constructor(private dataService: DataService) {
    this.dataService.redemption$.subscribe((redemption) => {
      this.giftCard = redemption;
    });


  }
  ngOnInit(): void {

  }
  isDigital = (value: Event) => {
    if (value.isTrusted) {
      this.cardType = "digital-card"
    }
  }
  isPhysical = (value: Event) => {
    if (value.isTrusted) {
      this.cardType = "physical-card"
    }
  }
  close = (id: number) => {
    let element = document.getElementById("#" + id.toString());
    if (element != null)
      element.style.display = "none"
  }

  increaseCount = () => {
    this.count++;
  }

  decreaseCount = () => {
    if (this.count > 0) {
      this.count--;
    }
  }

}
