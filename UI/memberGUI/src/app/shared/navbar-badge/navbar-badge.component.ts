import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar-badge',
  templateUrl: './navbar-badge.component.html',
  styleUrls: ['./navbar-badge.component.scss']
})
export class NavbarBadgeComponent implements OnInit {

  constructor(private apiService: ApiService){
    this.apiService.getUpdatedPromotion?.subscribe((data:any)=>{
      // this.languageSelected = data
      this.getAccountData();
    })
  }
  totalAmount: any;

  ngOnInit(): void {
    this.getAccountData();
  }

  getAccountData(){
    this.apiService.GET(`account-transactions?fields[0]=amount`).subscribe(res=>{
      // console.log(res)
      this.totalAmount = res.data.reduce(((total:number, amountData:any)=>{return total + amountData.attributes.amount}),0)
      // console.log({totalAmount: this.totalAmount});
    });
  }

}
