import { Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formFields, physicalRedemption } from './model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const $: any;
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent {
  @Input() title: string = "";
  @Input() elementId: string = ""
  @Input()
  fields: formFields[] = [];
  form!: FormGroup;
  formSubmit!: physicalRedemption
  @ViewChild('myModal') myModal!: ElementRef;
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }
  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.fields.forEach(field => {
      const validators = field.validation.required ? [Validators.required] : [];
      if (field.fieldType === 'email') {
        validators.push(Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'));
      }
      this.form.addControl(field.fieldName, this.formBuilder.control('', validators));
    });
  }
  onFormSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.formSubmit = this.form.value
      console.log(this.formSubmit)

    }
  }
}