import { Injectable } from '@angular/core';
import { ICar } from '../../shared/interfaces/ICar';
import { Subject } from 'rxjs';
import { IMileageLimit } from 'src/app/shared/interfaces/IMileageLimit';
import { IPaybackTime } from 'src/app/shared/interfaces/IPaybackTime';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  cars: ICar[] = [];
  carsChanged: Subject<ICar[]> = new Subject<ICar[]>();
  mileageLimit: IMileageLimit[];
  paybackTime: IPaybackTime[];
  car: ICar;

  setCars(car: ICar[]) {
    this.cars = car;
    this.carsChanged.next(this.cars);
  }

  getData(): ICar[]{
    return this.cars.slice();
  }

  getCarById(id: number): ICar {
    var car: ICar;
    this.cars.forEach(item=>{
      if(item.carId == id.toString()){
        car = item;
        return car;
      }
    });
    return car;
  }

  setMileageLimit(response: IMileageLimit[]) {
    this.mileageLimit = response;
  }

  setPaybackTime(response: IPaybackTime[]) {
    this.paybackTime = response;
  }

  getPaybackTime(): IPaybackTime[] {
    return this.paybackTime.slice();
  }
  
  getMileageLimit(): IMileageLimit[]{
    return this.mileageLimit.slice();
  }
}
