import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
	public isCollapsed = false;
  public isCollapse =false;
  panels = ['First', 'Second', 'Third'];
  giftCards = [{name: "start"}, {name: "diamond"},{name: "start1"}, {name: "diamond1"},{name: "start2"}, {name: "diamond2"}]

}
