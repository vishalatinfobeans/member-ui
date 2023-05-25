import { Component, HostListener } from '@angular/core';
import { Redemption } from '../model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gift-card-grid',
  templateUrl: './gift-card-grid.component.html',
  styleUrls: ['./gift-card-grid.component.scss']
})
export class GiftCardGridComponent {
  screenWidth!: number;
  screenHeight!: number;
  divideLenth !: number;
  detailsIdArray: Set<number> = new Set()
  redemptions: Array<Redemption> = [{
    url: 'https://icm.aexp-static.com/loyalty/lsm/HRC_GC.png',
    description: 'Description 1',
    showDescription: false
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1684244009716.jpg',
    description: 'Description 2',
    showDescription: false
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1524053602188.jpg',
    description: 'Description 3',
    showDescription: false
  },
  {
    url: 'https://icm.aexp-static.com//loyalty/lsm/Homechef.png',
    description: 'Description 1',
    showDescription: false
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/Home_Depot.png',
    description: 'Description 2',
    showDescription: false
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/Hotels-com.JPG',
    description: 'Description 3',
    showDescription: false
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1638455996557.png',
    description: 'Description 1',
    showDescription: false
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeimage1580229696918.png',
    description: 'Description 2',
    showDescription: false
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/mandarin.jpg',
    description: 'Description 2',
    showDescription: false
  }
  ];
  constructor(private dataService:DataService)
  {

  }
  ngOnInit() {
    this.getScreenResolution();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.getScreenResolution();
  }
  getScreenResolution() {
    this.screenWidth = window.screen.width;
    this.screenHeight = window.screen.height;
    if (this.screenWidth > 1000)
      this.divideLenth = 4
    else if (this.screenWidth > 767)
      this.divideLenth = 3
    else if (this.screenWidth > 463)
      this.divideLenth = 2
    else if (this.screenWidth <= 463)
      this.divideLenth = 1
  }
  descriptionIndex = (i: number) => {
    if (((i + 1) % this.divideLenth) === 0) {
      this.detailsIdArray.add(i)
      return true;
    }
    else if ((i + 1) == this.redemptions.length) {
      this.detailsIdArray.add(i)
      return true
    }
    else
      return false

  }


  openDetails = (index: number,giftCardDetails:Redemption) => {
    this.dataService.setGigtCardDetails(giftCardDetails);
    let columnPosition = (index % this.divideLenth);
    let id = 0;
    this.detailsIdArray.forEach((item: number) => {
      if ((item + 1) != index) {
        this.close(item + 1);
      }
    })


    let temp = index + (this.divideLenth - (index % this.divideLenth));
    if (index % this.divideLenth == 0) {
      id = index;
    } else if (temp <= this.redemptions.length) {
      id = temp;
    } else if (temp > this.redemptions.length) {
      id = this.redemptions.length;
    }


    let element = document.getElementById("#" + id.toString());
    if (element != null) { element.style.display = "block" }


  }
  close = (id: number) => {
    let element = document.getElementById("#" + id.toString());
    if (element != null)
      element.style.display = "none"
  }



}