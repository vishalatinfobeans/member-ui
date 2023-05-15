import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  submitted = false;

  isLoggedIn$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  ngOnInit() {
    this.isLoggedIn$ && this.router.navigate(["/"]); 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return ;
    this.authService.login(this.loginForm.value)
    this.router.navigate(["/dashboard"]);
  }

}
