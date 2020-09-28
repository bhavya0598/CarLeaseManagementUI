import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUserPersonal } from 'src/app/shared/interfaces/IUserPersonal';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-personal-details',
  templateUrl: './user-personal-details.component.html',
  styleUrls: ['./user-personal-details.component.scss']
})
export class UserPersonalDetailsComponent implements OnInit {
  userPersonal: IUserPersonal;
  subscription: Subscription[] = [];
  personalForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private location: Location) { }

  ngOnInit(): void {
    this.spinner.show()
    this.subscription.push(this.userService.getUserPersonalDataAPI().subscribe(res=>{
      this.userPersonal = res;
      console.log(this.userPersonal);
      this.initailizeForm();
      this.spinner.hide()
    }));
  }

  initailizeForm() {   
    if(this.userPersonal == null){
      this.userPersonal = {
        city: '',
        contact: '',
        country: '',
        dob: '2020-01-01',
        firstname: '',
        gender: false,
        houseNo: '',
        lastname: '',
        pincode: '',
        state: '',
        street: '',
        userId: '',
        userPersonalId: 0
      }; 
    }
    this.personalForm = this.fb.group({
      userId: [this.authService.getUserId()],
      firstname: [this.userPersonal.firstname, [Validators.required,Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
      lastname: [this.userPersonal.lastname,[Validators.required,Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
      gender: [this.userPersonal.gender, [Validators.required]],
      dob: [this.datePipe.transform(new Date(this.userPersonal.dob), 'yyyy-MM-dd'), [Validators.required]],
      contact: [this.userPersonal.contact,[Validators.required,Validators.pattern('([0-9]{11}$)|(^[6-9][0-9]{9}$)')]],
      houseNo: [this.userPersonal.houseNo,[Validators.required]],
      street: [this.userPersonal.street, [Validators.required]],
      city: [this.userPersonal.city, [Validators.required]],
      state: [this.userPersonal.state, [Validators.required]],
      country: [this.userPersonal.country, [Validators.required]],
      pincode: [this.userPersonal.pincode, [Validators.required]]
    });
    this.getGender();
  }

  onSubmit(){
    this.spinner.show();
    this.setGender();
    this.subscription.push(this.userService.submitUserPersonalDetails(this.personalForm.getRawValue()).subscribe((res: IUserPersonal)=>{
      this.spinner.hide();
      this.router.navigate(['user','bank']);
    }));
  }

  private setGender(){
    if(this.personalForm.get('gender').value == 'male'){
      this.personalForm.get('gender').setValue(true);
    }
    else{
      this.personalForm.get('gender').setValue(false);
    }
  }

  private getGender(){
    if(this.personalForm.get('gender').value == true){
      this.personalForm.get('gender').setValue('male');
    }
  }

  goBack(){
    this.location.back();
  }
}
