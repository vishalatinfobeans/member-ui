import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  title = 'Incentivize Health Admin';
  currentYear = (new Date()).getFullYear().toString();
  buildDisplayVersion = '1.0';
  constructor(private apiService: ApiService) {}

  selectLanguage(lan: string) {
    this.apiService.setLanguage(lan);
  } 
}
