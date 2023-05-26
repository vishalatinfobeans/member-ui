import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'earning-opportunities',
  templateUrl: './earning-opportunities.component.html',
  styleUrls: ['./earning-opportunities.component.scss']
})
export class EarningOpportunitiesComponent implements OnInit {

  constructor(private apiService: ApiService) {}
  // promotions :any;

  ngOnInit(): void {
  }


}
