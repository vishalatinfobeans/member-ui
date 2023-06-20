import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formFields } from './model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl } from '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent {
  @Input() modalRef!: NgbModalRef;
  @Input() title: string = '';
  @Input() fields: formFields[] = [];
  @Input() onSubmit!: Function;
  @Input() labels!: any;
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    console.log(this.fields);
  }
  ngOnInit() {
    console.log(this.fields);
    this.form = this.formBuilder.group({});
    this.fields.forEach((field) => {
      const validators = field.validation.required ? [Validators.required] : [];
      if (field.fieldType === 'email') {
        validators.push(Validators.email);
      } else if (field.fieldType === 'tel') {
        validators.push(this.telValidator);
      }
      this.form.addControl(
        field.fieldName,
        this.formBuilder.control('', validators)
      );
      this.form.addValidators(this.emailMatchValidator);
    });
  }
  telValidator(control: FormControl) {
    const telRegex = /^[0-9]{10}$/;
    if (control.value && !telRegex.test(control.value)) {
      return { invalidTel: true };
    }
    return null;
  }

  emailMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.get('email');
    const confirmEmail = control.get('confirmEmail');
    if (email && confirmEmail && email.value !== confirmEmail.value) {
      return { emailMismatch: true, type: 'emailMismatch' };
    }
    return null;
  }
  onFormSubmit(event: Event) {
    event.preventDefault();
    console.log(this.form.valid);
    if (this.form.valid) {
      this.onSubmit(this.form.value);
    }
    this.closeModal();
  }

  closeModal = () => {
    this.modalRef?.close();
    const body = document.querySelector('body');
    if (body) body.style.overflow = 'auto !important';
  };

  checkError() {
    console.log(this.form.errors);
  }
}
