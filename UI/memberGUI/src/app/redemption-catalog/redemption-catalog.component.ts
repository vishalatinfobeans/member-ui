import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { redemptionForm } from './model';
import { formFields } from '../shared/form-modal/model';
import { ApiService } from '../api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { DataService } from './data.service';
import { event } from 'jquery';
import { ReviewRedemptionModalComponent } from './review-redemption-modal/review-redemption-modal.component';

@Component({
  selector: 'app-redemption-catalog',
  templateUrl: './redemption-catalog.component.html',
  styleUrls: ['./redemption-catalog.component.scss'],
})
export class RedemptionCatalogComponent implements OnInit {
  selectedTab: string = 'tab1';
  searchPrompt: string = '';
  allRedemptions!: any;
  paginatedRedemptions!: Array<any>;
  addedCards = 20;
  formSubmit!: any;
  form!: FormGroup;
  loadingCards: boolean = true;
  scrollingDistance = 1000;
  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private dataService: DataService,
    private elementRef: ElementRef
  ) {}
  ngOnInit(): void {
    this.getCatatlogData();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPos = window.innerHeight + window.scrollY;
    const documentHeight = this.elementRef.nativeElement.offsetHeight;

    if (scrollPos >= documentHeight) {
      this.performTask();
    }
  }
  performTask() {
    let start = this.addedCards;
    let end = this.addedCards + 20;
    this.paginatedRedemptions?.concat(this.allRedemptions.slice(start, end));
    this.paginatedRedemptions = [
      ...this.paginatedRedemptions,
      ...this.allRedemptions.slice(start, end),
    ];
    this.addedCards = this.addedCards + 20;
  }

  getCatatlogData(): void {
    this.apiService.getRewardCatalogFromTango().subscribe((response: any) => {
      console.log(response.brands);
      this.allRedemptions = response.brands;
      this.loadingCards = false;
      this.paginatedRedemptions = response.brands.slice(0, 20);
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  searchRedemption(valueToSearch: string): void {}
}
