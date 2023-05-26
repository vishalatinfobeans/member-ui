import { Component, HostListener, OnInit } from '@angular/core';
import { Redemption } from './model';

@Component({
  selector: 'app-redemption-catalog',
  templateUrl: './redemption-catalog.component.html',
  styleUrls: ['./redemption-catalog.component.scss']
})
export class RedemptionCatalogComponent {
  selectedTab: string = 'tab1';
  searchPrompt:string="";
  redemptions: Array<Redemption> = [{
    url: 'https://icm.aexp-static.com/loyalty/lsm/HRC_GC.png',
    description: 'Description 1',
    showDescription: false,
    title: "Title 1"
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1684244009716.jpg',
    description: 'Description 2',
    showDescription: false,
    title: "Title 2"
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1524053602188.jpg',
    description: 'Description 3',
    showDescription: false,
    title: "Title 3"
  },
  {
    url: 'https://icm.aexp-static.com//loyalty/lsm/Homechef.png',
    description: 'Description 1',
    showDescription: false,
    title: "Title 4"
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/Home_Depot.png',
    description: 'Description 2',
    showDescription: false,
    title: "Title 5"
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/Hotels-com.JPG',
    description: 'Description 3',
    showDescription: false,
    title: "Title 6"
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1638455996557.png',
    description: 'Description 1',
    showDescription: false,
    title: "Title 7"
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeimage1580229696918.png',
    description: 'Description 2',
    showDescription: false,
    title: "Title 8"
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/mandarin.jpg',
    description: 'Description 2',
    showDescription: false,
    title: "Title 9"
  }
  ];
  localRedemptionArray: Array<Redemption> = this.redemptions;
  selectTab(tab: string) {
    this.selectedTab = tab;

  }
  searchRedemption(valueToSearch:string) {
    const regex = new RegExp(valueToSearch, 'i'); // 'i' flag for case-insensitive matching
    this.redemptions.map((item) => {
      if (regex.test(item.title)) {

        this.localRedemptionArray.push(item)
      }
    })
 console.log(this.localRedemptionArray);

  }
}







