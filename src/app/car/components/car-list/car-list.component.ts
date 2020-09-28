import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICar } from 'src/app/shared/interfaces/ICar';
import { SharedService } from '../../../shared/services/shared.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars: ICar[];
  subcriptions: Subscription[] = [];
  constructor(private sharedService: SharedService,
    private spinner: NgxSpinnerService) {
      this.spinner.show();
    this.subcriptions.push(this.sharedService.getCarsData().subscribe(res =>{
      this.cars = res;
      this.spinner.hide();
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(item=>item.unsubscribe())
  }
}
