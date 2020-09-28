import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$')]]
  })
  subscription: Subscription[] = [];
  loginError: string;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.spinner.show();
    this.subscription.push(this.authService.login(this.loginForm).subscribe(() => {
      this.spinner.hide();
      this.router.navigate(['car']);
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.loginError = err.error.message;
      }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }
}
