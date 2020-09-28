import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user-details/services/user.service';
import { IUserBank } from 'src/app/shared/interfaces/IUserBank';
import { IUserPersonal } from 'src/app/shared/interfaces/IUserPersonal';
import { IUserEmployment } from 'src/app/shared/interfaces/IUserEmployment';
import { ICar } from 'src/app/shared/interfaces/ICar';
import { QuoteService } from '../../services/quote.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { IQuote } from 'src/app/shared/interfaces/IQuote';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  car: ICar;
  userBank: IUserBank;
  userPersonal: IUserPersonal;
  userEmployment: IUserEmployment;
  quote: IQuote;
  isDisabled: boolean = true;
  isSaved: boolean = false;
  subscription: any;
  finalQuote: any;

  constructor(private userService: UserService,
    private quoteService: QuoteService,
    private router: Router,
    private currency: CurrencyPipe,
    private spinner: NgxSpinnerService,
    private location: Location) { }

  ngOnInit(): void {
    // Get USER EMPLOYMENT DATA
    this.userService.getUserEmploymentDataAPI().subscribe((res: IUserEmployment) => this.userEmployment = res);

    // GET USER PERSONAL DATA
    this.userService.getUserPersonalDataAPI().subscribe((res: IUserPersonal) => this.userPersonal = res);

    // GET USER BANK DATA
    this.userService.getUserBankDataAPI().subscribe((res: IUserBank) => this.userBank = res);

    // GET CAR DATA
    this.car = JSON.parse(localStorage.getItem("car"));
    // this.car = JSON.parse(sessionStorage.getItem("car"));

    //GET QUOTE DATA
    this.quote = JSON.parse(localStorage.getItem("quote"));

    //GET SUBSCRIPTION DATA
    this.subscription = JSON.parse(localStorage.getItem("subscription"));
  }

  onClick() {
    var doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Car Lease Quote', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    // TABLE FOR USER EMPLOYMENT DATA
    (doc as any).autoTable({
      head: [["Company",
        "Address",
        "Salary",
        "Credit Score",
        "Employment Type"
      ]],
      body: [[this.userEmployment.companyName,
      this.userEmployment.companyAddress,
      this.currency.transform(this.userEmployment.salary, 'INR', 'INR'),
      this.userEmployment.creditScore,
      this.userEmployment.employmentType]],
      theme: 'striped',
      didDrawCell: (data: { column: { index: any; }; }) => {
      }
    });

    // TABLE FOR USER BANK DATA
    (doc as any).autoTable({
      head: [["Bank",
        "Account Number",
        "Account Holder Name",
        "Account Type"
      ]],
      body: [[this.userBank.bankName,
      this.userBank.accountNumber,
      this.userBank.accountHolderName,
      this.userBank.accountType]],
      theme: 'striped',
      didDrawCell: (data: { column: { index: any; }; }) => {
      }
    });

    // TABLE FOR CAR DATA
    (doc as any).autoTable({
      head: [["Model",
        "Mileage Limit",
        "Payback Time",
        "Price"
      ]],
      body: [[this.car.model,
      this.subscription.kilometer + ' km',
      this.subscription.months + ' months',
      this.currency.transform(this.subscription.price.toFixed(2), 'INR', 'INR')]],
      theme: 'striped',
      didDrawCell: (data: { column: { index: any; }; }) => {
      }
    });

    // TABLE FOR USER PERSONAL DATA
    (doc as any).autoTable({
      head: [["Name", "Address", "Pincode"
      ]],
      body: [[this.userPersonal.firstname + ' ' + this.userPersonal.lastname,
      this.userPersonal.houseNo + ' ' + this.userPersonal.street + ' ' + this.userPersonal.city,
      this.userPersonal.pincode]],
      theme: 'striped',
      didDrawCell: (data: { column: { index: any; }; }) => {
      }
    });

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document  
    doc.save('quote.pdf');
    this.router.navigate(['/car']);
  }

  saveQuote() {
    this.spinner.show();
    console.log(this.quote)
    this.quoteService.saveQuote(this.quote).subscribe(res => {
      this.isDisabled = false;
      this.isSaved = true;
      this.spinner.hide();
      alert("Quote Saved! Click on download button to download the pdf!");
    },
      err => {
        this.spinner.hide();
        alert("Error in saving the quote!");
      });
  }

  goBack(){
    this.location.back();
  }

}
