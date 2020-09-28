import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IErrorMessage } from '../../../shared/interfaces/IErrorMessage';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  subscription: Subscription[] =[];
  errorMessage: IErrorMessage;
  registerForm = this.fb.group({
    email: ['',[Validators.required, Validators.maxLength(50),Validators.email]],
    password: ['',[Validators.required,Validators.maxLength(50),Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$')]],
    confirmPassword: ['',[Validators.required]],
    username: ['',[Validators.required, Validators.maxLength(50)]]
  },{
    validator: this.mustMatch('password','confirmPassword')
  })

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  
  mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  }

  onSubmit(){
    this.spinner.show();
    this.subscription.push(this.authService.register(this.registerForm).subscribe(
      ()=>{
        this.authService.verification(this.registerForm).subscribe(
          ()=>{
            this.spinner.hide();
            alert("A mail has been sent to your email. Please verify Email before login!");
            this.router.navigate(['/login']);
          },
          err =>{
            this.spinner.hide();
            console.log(err);
          }
        )
    }, err=>{
      this.errorMessage = err.error;
      this.spinner.hide();
    }))
  }
}
