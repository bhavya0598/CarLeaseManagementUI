import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IEmploymentType } from 'src/app/shared/interfaces/IEmploymentType';
import { IContracts } from 'src/app/shared/interfaces/IContracts';
import { IUserEmployment } from 'src/app/shared/interfaces/IUserEmployment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-employment-details',
  templateUrl: './user-employment-details.component.html',
  styleUrls: ['./user-employment-details.component.scss']
})
export class UserEmploymentDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription[] =[];
  employmentTypes: IEmploymentType[]=[];
  contracts: IContracts[]=[];
  userEmployment: IUserEmployment;
  employmentForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private location: Location) { }

  ngOnInit(): void {
    this.spinner.show();
    this.subscription.push(this.userService.getContracts().subscribe((res:IContracts[])=>{
      this.contracts = res;
    }));
    this.subscription.push(this.userService.getEmploymentTypes().subscribe((res:IEmploymentType[])=>{
      this.employmentTypes = res;
    }));
    this.userEmployment = JSON.parse(localStorage.getItem('userEmployment'));
    this.subscription.push(this.userService.getUserEmploymentDataAPI().subscribe(res=>{
      this.userEmployment = res;
      console.log(this.userEmployment);
      this.initializeForm();
      this.spinner.hide();
    }))
  }

  initializeForm() {
    if(this.userEmployment == null){
      this.userEmployment = {
        companyAddress: '',
        companyName: '',
        contractId: null,
        creditScore: '',
        employmentTypeId: null,
        salary: '',
        userEmploymentId: 0,
        userId: '',
        contractType: '',
        employmentType: ''
      }; 
    }
    this.employmentForm = this.fb.group({
      userId: [this.authService.getUserId()],
      companyAddress: [this.userEmployment.companyAddress,[Validators.required]],
      companyName: [this.userEmployment.companyName,[Validators.required]],
      contractId: [this.userEmployment.contractId,[Validators.required]],
      creditScore: [this.userEmployment.creditScore,[Validators.required,Validators.min(300),Validators.max(850)]],
      employmentTypeId: [this.userEmployment.employmentTypeId,[Validators.required]],
      salary: [this.userEmployment.salary,[Validators.required]],
    })
  }

  onSubmit(){
    this.spinner.show();
    this.subscription.push(this.userService.submitUserEmploymentDetails(this.employmentForm.getRawValue()).subscribe((res:IUserEmployment)=>{
      this.spinner.hide();
      this.router.navigate(['/quote']);
    }))
    console.log(this.employmentForm);
  }
  
  goBack(){
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item=>item.unsubscribe());
  }
}
