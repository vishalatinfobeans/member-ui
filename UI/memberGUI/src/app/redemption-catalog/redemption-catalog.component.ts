import { Component, HostListener, OnInit } from '@angular/core';
import { Redemption } from './model';
import { formFields } from '../shared/form-modal/model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-redemption-catalog',
  templateUrl: './redemption-catalog.component.html',
  styleUrls: ['./redemption-catalog.component.scss']
})
export class RedemptionCatalogComponent implements OnInit {


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
  redemptions!: any;
  constructor(private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.getCatatlogData();
  }

  getCatatlogData(): void {
    this.apiService.getRewardCatalogFromTango()
      .subscribe((response: any) => {
        console.log(response.brands)
        this.redemptions=response.brands
      });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  searchRedemption(valueToSearch: string) {


  }
}







