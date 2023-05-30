import { Component, HostListener, OnInit } from '@angular/core';
import { Redemption } from './model';
import { formFields } from '../shared/form-modal/model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-redemption-catalog',
  templateUrl: './redemption-catalog.component.html',
  styleUrls: ['./redemption-catalog.component.scss']
})
export class RedemptionCatalogComponent{

  constructor(private apiService: ApiService) {
    this.apiService.getRewardCatalogFromTango()
  }
  digitalRedemptionFields: formFields[] = [
    {
      fieldType: 'text',
      fieldName: 'firstName',
      label: 'First Name',
      validation: { required: true }
    },
    {
      fieldType: 'text',
      fieldName: 'lastName',
      label: 'Last Name',
      validation: { required: true }
    },
    {
      fieldType: 'email', fieldName: 'email',
      label: 'Email', validation: { required: true }
    }
  ]
  physicalRedemptionFields: formFields[] = [
    {
      fieldType: 'text',
      fieldName: 'firstName',
      label: 'First Name',
      validation: { required: true }
    },
    {
      fieldType: 'text',
      fieldName: 'lastName',
      label: 'Last Name',
      validation: { required: true }
    },

    {
      fieldType: 'text', fieldName: 'address1',
      label: 'Address 1', validation: { required: false }
    },
    {
      fieldType: 'text', fieldName: 'address2',
      label: 'Address 2', validation: { required: false }
    },
    {
      fieldType: 'text', fieldName: 'city',
      label: 'City', validation: { required: false }
    },
    {
      fieldType: 'text', fieldName: 'state',
      label: 'State', validation: { required: false }
    },
    {
      fieldType: 'text', fieldName: 'zip',
      label: 'Zip', validation: { required: false }
    },
    {
      fieldType: 'tel', fieldName: 'phone',
      label: 'Phone', validation: { required: false }
    },
    {
      fieldType: 'email', fieldName: 'email',
      label: 'Email', validation: { required: true }
    },

  ]
  selectedTab: string = 'tab1';
  searchPrompt: string = "";
  redemptions: Array<Redemption> = [{
    url: 'https://icm.aexp-static.com/loyalty/lsm/HRC_GC.png',
    description: 'Description 1',
    showDescription: false,
    title: "Title 1",
    rewardType: "digital-card"
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1684244009716.jpg',
    description: 'Description 2',
    showDescription: false,
    title: "Title 2",
    rewardType: "physical-card"
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1524053602188.jpg',
    description: 'Description 3',
    showDescription: false,
    title: "Title 3",
    rewardType: "digital-card"
  },
  {
    url: 'https://icm.aexp-static.com//loyalty/lsm/Homechef.png',
    description: 'Description 1',
    showDescription: false,
    title: "Title 4",
    rewardType: "physical-card"
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/Home_Depot.png',
    description: 'Description 2',
    showDescription: false,
    title: "Title 5",
    rewardType: "digital-card"
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/Hotels-com.JPG',
    description: 'Description 3',
    showDescription: false,
    title: "Title 6",
    rewardType: "physical-card"
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeImage1638455996557.png',
    description: 'Description 1',
    showDescription: false,
    title: "Title 7",
    rewardType: "physical-card"
  },
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/largeimage1580229696918.png',
    description: 'Description 2',
    showDescription: false,
    title: "Title 8",
    rewardType: "digital-card"
  }
    ,
  {
    url: 'https://icm.aexp-static.com/loyalty/lsm/mandarin.jpg',
    description: 'Description 2',
    showDescription: false,
    title: "Title 9",
    rewardType: "physical-card"
  }
  ];
  localRedemptionArray: Array<Redemption> = this.redemptions;
  selectTab(tab: string) {
    this.selectedTab = tab;

  }
  searchRedemption(valueToSearch: string) {
    const regex = new RegExp(valueToSearch, 'i'); // 'i' flag for case-insensitive matching
    this.redemptions.map((item) => {
      if (regex.test(item.title)) {

        this.localRedemptionArray.push(item)
      }
    })
    console.log(this.localRedemptionArray);

  }
}







