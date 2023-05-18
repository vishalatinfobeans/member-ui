import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Promotions } from './models';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  promotions!: [Promotions];
  constructor(private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.apiService.promotions.subscribe(res => { this.promotions = res.data; console.log(res) });
  }

}
