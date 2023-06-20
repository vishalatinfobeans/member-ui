import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  lables: any = {
    title: 'Log in to your member account',
    user_id_lable: 'Email address',
    password_lable: 'Password',
    sing_in_button_text: 'SIGN IN',
    sso_sign_in_lable: 'Sign in with google',
    forgot_username_text: 'Forgot Username or Password',
    not_signed_text: 'Not signed up',
    register_now_text: 'Register now',
    createdAt: '2023-05-25T13:09:32.267Z',
    updatedAt: '2023-05-25T13:28:09.342Z',
    publishedAt: '2023-05-25T13:09:34.580Z',
    email_required: 'Email is required',
    incorrect_email_format: 'Enter correct format of email',
    password_required: 'Password is required',
    user_id_placeholder: 'name@example.com',
    password_place_holder: 'Password',
  };

  isLoggedIn$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.apiService.getSelectedLanguage?.subscribe((data: any) => {
      this.languageSelected = data;
      this.updateLables(data);
    });
  }
  languageSelected: any;
  ngOnInit() {
    this.apiService.getSelectedLanguage?.subscribe(
      (data: any) => (this.languageSelected = data)
    );
    this.updateLables('en');
    this.isLoggedIn$ && this.router.navigate(['/']);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  updateLables(lan: any) {
    this.apiService.GET(`login?locale=${lan}`).subscribe((data: any) => {
      const {
        data: { attributes },
      } = data;
      this.lables = attributes;
      console.log(this.lables);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value);
    this.router.navigate(['/earning-opportunities']);
  }
}
