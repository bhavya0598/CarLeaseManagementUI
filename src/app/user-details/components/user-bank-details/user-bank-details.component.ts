import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IAccountType } from 'src/app/shared/interfaces/IAccountType';
import { IUserBank } from 'src/app/shared/interfaces/IUserBank';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-bank-details',
  templateUrl: './user-bank-details.component.html',
  styleUrls: ['./user-bank-details.component.scss']
})
export class UserBankDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription[] =[];
  accountTypes: IAccountType[];
  userBank: IUserBank;
  bankForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private location: Location) {
    }

  ngOnInit(): void {
    this.spinner.show();
    this.subscription.push(this.userService.getAccountType().subscribe((res:IAccountType[])=>{
      // this.spinner.hide();
      this.accountTypes = res;
    }));
    this.subscription.push(this.userService.getUserBankDataAPI().subscribe((res: IUserBank)=>{
      this.userBank = res;
      console.log(res);
      this.initializeForm();
      this.spinner.hide();
    }))
    // this.userBank = JSON.parse(localStorage.getItem('userBank'));
  }

  initializeForm() {
    if(this.userBank == null){
      this.userBank = {
        accountHolderName: '',
        accountNumber: '',
        accountTypeId: null,
        bankAddress: '',
        bankBranch: '',
        bankCountry: '',
        bankName: '',
        bankState: '',
        userBankId: 0,
        userId: '',
        accountType: ''
      }; 
    }
    this.bankForm = this.fb.group({
      userId: [this.authService.getUserId()],
      accountNumber: [this.userBank.accountNumber,[Validators.required, Validators.pattern('^[0-9]{9,18}$')]],
      accountTypeId: [this.userBank.accountTypeId,[Validators.required]],
      accountHolderName: [this.userBank.accountHolderName,[Validators.required, Validators.pattern('^((?:[A-Za-z]+ ?){1,3})$')]],
      bankBranch: [this.userBank.bankBranch,[Validators.required]],
      bankName: [this.userBank.bankName,[Validators.required]],
      bankState: [this.userBank.bankState,[Validators.required]],
      bankCountry: [this.userBank.bankCountry,[Validators.required]],
      bankAddress: [this.userBank.bankAddress,[Validators.required]]
    })
  }

  onSubmit(){
    this.spinner.show();
    this.subscription.push(this.userService.submitUserBankDetails(this.bankForm.getRawValue()).subscribe((res:IUserBank)=>{
      this.spinner.hide();
      this.router.navigate(['/user','employment']);
    }))
    console.log(this.bankForm);
  }
  
  goBack(){
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item=>item.unsubscribe());
  }
}
