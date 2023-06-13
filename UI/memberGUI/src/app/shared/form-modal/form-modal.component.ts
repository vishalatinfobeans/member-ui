import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formFields } from './model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { redemptionForm } from 'src/app/redemption-catalog/model';
import { AbstractControl } from '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent {
  @Input() title: string = "";
  @Input() elementId: string = ""
  @Input() fields: formFields[] = [];
  @Output() formSubmitted = new EventEmitter<any>();
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.fields.forEach(field => {
      const validators = field.validation.required ? [Validators.required] : [];
      if (field.fieldType === 'email') {
        validators.push(Validators.email);
      }
      else if (field.fieldType === 'tel') {
        validators.push(this.telValidator)
      }
      this.form.addControl(field.fieldName, this.formBuilder.control('', validators));
       this.form.addValidators(this.emailMatchValidator)
    });
  }
  telValidator(control: FormControl) {
    const telRegex = /^[0-9]{10}$/;
    if (control.value && !telRegex.test(control.value)) {
      return { 'invalidTel': true };
    }
    return null;
  }


  emailMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.get('email');
    const confirmEmail = control.get('confirmEmail');
    if (email && confirmEmail && email.value !== confirmEmail.value) {
      return { 'emailMismatch': true ,'type':'emailMismatch'};
    }
    return null;
  }
  onFormSubmit(event: Event) {
    event.preventDefault();
    console.log(this.form.valid);
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }


  checkError(){
console.log(this.form.errors)
  }
}
