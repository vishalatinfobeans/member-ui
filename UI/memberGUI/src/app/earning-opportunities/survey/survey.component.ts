import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit{

  submitted = false;
  closeResult = '';
  @Input() btnText:any;
  @Input() surveyQuestions:any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    
  }

	open(content: any) {
    console.log(this.surveyQuestions);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result: any) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason: any) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  getIndexLetter(index: number): string {
    // Check if the index is within the range of A-Z
    if (index >= 0 && index < 26) {
      return String.fromCharCode(97 + index);
    } else {
      return '';
    }
  }

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  selectOption(survey:any, option:any) {
    survey.selectedOption = option;
    console.log(this.surveyQuestions)
  }

  closeModal() {
    console.log("close modal");
    this.surveyQuestions.data.forEach((survey:any)=> delete survey.attributes.selectedOption)
    console.log(this.surveyQuestions);
  }
}
