import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { ICar } from 'src/app/shared/interfaces/ICar';
import { FormBuilder, Validators } from '@angular/forms';
import { IMileageLimit } from 'src/app/shared/interfaces/IMileageLimit';
import { IPaybackTime } from 'src/app/shared/interfaces/IPaybackTime';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { QUOTE } from 'src/app/shared/constants/const';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit, OnDestroy {
  private carId: number;
  private subscription: Subscription[] = [];
  
  price: number;
  car: ICar;
  mileageLimits: IMileageLimit[];
  paybackTimes: IPaybackTime[];
  months: number = QUOTE.MONTHS;
  kilometer: number = QUOTE.KILOMETER;
  quote = this.fb.group({
    kilometers: [QUOTE.KILOMETER, [Validators.required]],
    months: [QUOTE.MONTHS, [Validators.required]],
  })

  constructor(private route: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();

    this.subscription.push(this.sharedService.getMileageLimit().subscribe((res: IMileageLimit[]) => {
      this.mileageLimits = res;
      this.spinner.hide();
    }));

    this.subscription.push(this.sharedService.getPaybackTime().subscribe((res: IPaybackTime[]) => {
      this.paybackTimes = res;
      this.spinner.hide();
    }));

    this.route.params.subscribe(
      (param: Params) => {
        this.carId = param.id;
        this.car = this.carService.getCarById(this.carId);
      }
    );

    this.quote.get('kilometers').valueChanges.subscribe(res => {
      this.kilometer = res;
      this.calculatePrice();
    });

    this.quote.get('months').valueChanges.subscribe(res => {
      this.months = res;
      this.calculatePrice();
    });

    this.calculatePrice(); 
  }

  onSubmit() {
    this.kilometer = +this.quote.get('kilometers').value;
    this.months = +this.quote.get('months').value;
    var mileageId: number;
    var paybackTimeId: number;
    this.mileageLimits.forEach(item => {
      if (item.kilometers == this.kilometer.toString()) {
        mileageId = item.mileageLimitId;
      }
    })
    this.paybackTimes.forEach(item => {
      if (item.months == this.months.toString()) {
        paybackTimeId = item.paybackTimeId;
      }
    })

    this.calculatePrice();

    var quote = {
      userId: localStorage.getItem("userId"),
      carId: this.carId,
      mileageLimitId: mileageId,
      paybackTimeId: paybackTimeId,
      price: this.price
    }

    localStorage.setItem("quote", JSON.stringify(quote));
    localStorage.setItem("car", JSON.stringify(this.car));
    this.router.navigate(['/user', 'personal']);
  }

  calculatePrice() {
    const x1 = +this.car.price / 100;
    const x2 = x1 * ((this.kilometer / 1000) * 2) / 10;
    const x3 = x1 * (this.months / 2) / 100;
    this.price = (x1 + x2 - x3) / this.months;
    this.price.toFixed(2);
    this.savePlans(this.kilometer, this.months);
  }

  savePlans(kilometer: number, months: number) {
    var subscription = {
      kilometer: kilometer,
      months: months,
      price: this.price
    }
    localStorage.setItem("subscription", JSON.stringify(subscription));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }
}
