import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICar } from '../../shared/interfaces/ICar';
import { CarService } from './car.service';

@Injectable({providedIn: 'root'})
export class CarResolverService implements Resolve<Observable<any> | ICar[]> {
  constructor(
    private carService: CarService,
    private sharedService: SharedService
  ) {}

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const cars = this.carService.getData()
    if (cars.length === 0) {
      return this.sharedService.getCarsData();
    } else {
      return cars;
    }
  }
}