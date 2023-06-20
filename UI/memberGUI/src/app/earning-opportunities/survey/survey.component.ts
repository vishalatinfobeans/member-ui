import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit{

  submitted = false;
  optionSelected = false;
  disableTakeSurvey = false;
  closeResult = '';
  @Input() promotionData:any;
  @Input() surveyQuestions:any;
  @Output() surveyCompletion: EventEmitter<number> =   new EventEmitter();


  constructor(private modalService: NgbModal, private apiService: ApiService) {}

  ngOnInit(): void {
    console.log("survey component ngoninit");
    
  }

	open(content: any) {
    console.log(this.surveyQuestions);
    if (this.promotionData.attributes.no_of_attempts < this.promotionData.attributes.max_count) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
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
    this.optionSelected = true;
    survey.selectedOption = option;
    console.log(this.surveyQuestions)
  }

  closeModal() {
    console.log("close modal");
    this.surveyQuestions.data.forEach((survey:any)=> delete survey.attributes.selectedOption)
    this.optionSelected = false;
    console.log(this.surveyQuestions);
  }

  saveResponse() {
    console.log(this.surveyQuestions);
    this.surveyCompletion.emit(this.surveyQuestions);
  }
}
