import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICar } from '../interfaces/ICar';
import { tap, catchError } from 'rxjs/operators';
import { CarService } from '../../car/services/car.service';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IPaybackTime } from '../interfaces/IPaybackTime';
import { IMileageLimit } from '../interfaces/IMileageLimit';
import { API } from '../constants/const';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private headers: HttpHeaders;
  private token: string = null;

  constructor(private http: HttpClient,
    private carService: CarService,
    private authService: AuthService
  ) {
    this.token = this.authService.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.token
    })
  }

  getCarsData(): Observable<ICar[]> {
    return this.http.get<ICar[]>(API.CAR_API, { headers: this.headers })
      .pipe(
        tap((response: ICar[]) => {
          this.carService.setCars(response)
        }),
        catchError(err => {
          return throwError("something went wrong");
        })
      );
  }

  getPaybackTime(): Observable<IPaybackTime[]> {
    return this.http.get<IPaybackTime[]>(API.GET_PAYBACK_TIME_API, { headers: this.headers })
      .pipe(
        tap((response: IPaybackTime[]) => {
          this.carService.setPaybackTime(response);
        }),
        catchError(err => {
          return throwError("something went wrong");
        })
      );
  }

  getMileageLimit(): Observable<IMileageLimit[]> {
    return this.http.get<IMileageLimit[]>(API.GET_MILEAGE_LIMIT_API, { headers: this.headers })
      .pipe(
        tap((response: IMileageLimit[]) => {
          this.carService.setMileageLimit(response);
        }),
        catchError(err => {
          return throwError("something went wrong");
        })
      );
  }
}
