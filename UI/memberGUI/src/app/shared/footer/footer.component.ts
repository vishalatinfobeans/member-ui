import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  title = 'Incentivize Health Admin';
  currentYear = (new Date()).getFullYear().toString();
  buildDisplayVersion = '1.0';
}
