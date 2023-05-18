import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService) {}
  promotions :any;

  ngOnInit(): void {
    this.apiService.GET("http://localhost:1337/api/promotions").subscribe((res: any) => {
      console.log(res)
      const {body : { data }} = res;
      this.promotions = data || [];
      console.log(this.promotions);
    });
  }


}
