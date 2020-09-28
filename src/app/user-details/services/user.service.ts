import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IContracts } from 'src/app/shared/interfaces/IContracts';
import { IEmploymentType } from 'src/app/shared/interfaces/IEmploymentType';
import { IUserPersonal } from 'src/app/shared/interfaces/IUserPersonal';
import { IUserEmployment } from 'src/app/shared/interfaces/IUserEmployment';
import { IUserBank } from 'src/app/shared/interfaces/IUserBank';
import { IAccountType } from 'src/app/shared/interfaces/IAccountType';
import { tap } from 'rxjs/operators';
import { API } from 'src/app/shared/constants/const';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders;
  private userPersonalData: IUserPersonal;
  private userBankData: IUserBank;
  private userEmploymentData: IUserEmployment;

  constructor(
    private authService: AuthService,
    private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.authService.getToken()
    })
  }

  submitUserPersonalDetails(form: IUserPersonal): Observable<IUserPersonal> {
    var body = JSON.stringify(form);
    return this.http.post<IUserPersonal>(API.POST_USER_PERSONAL_DATA, body, { headers: this.headers })
      .pipe(
        tap((res: IUserPersonal) => {
          this.setUserPersonalData(res);
        })
      )
  }

  submitUserBankDetails(form: IUserBank): Observable<IUserBank> {
    var body = JSON.stringify(form);
    return this.http.post<IUserBank>(API.POST_USER_BANK_DATA, body, { headers: this.headers })
      .pipe(
        tap((res: IUserBank) => {
          this.setUserBankData(res);
        })
      )
  }

  submitUserEmploymentDetails(form: IUserEmployment): Observable<IUserEmployment> {
    var body = JSON.stringify(form);
    return this.http.post<IUserEmployment>(API.POST_USER_EMPLOYEMENT_DATA, body, { headers: this.headers })
      .pipe(
        tap((res: IUserEmployment) => {
          this.setUserEmploymentData(res);
        })
      )
  }

  getAccountType(): Observable<IAccountType[]> {
    return this.http.get<IAccountType[]>(API.GET_ACCOUNT_TYPES, { headers: this.headers })
  }

  getContracts(): Observable<IContracts[]> {
    return this.http.get<IContracts[]>(API.GET_CONTRACTS, { headers: this.headers })
  }

  getEmploymentTypes(): Observable<IEmploymentType[]> {
    return this.http.get<IEmploymentType[]>(API.GET_EMPLOYMENT_TYPES, { headers: this.headers })
  }

  setUserPersonalData(userPersonalData: IUserPersonal) {
    this.userPersonalData = userPersonalData;
  }

  setUserBankData(userBankData: IUserBank) {
    this.userBankData = userBankData;
  }

  setUserEmploymentData(userEmploymentData: IUserEmployment) {
    this.userEmploymentData = userEmploymentData;
  }

  getUserBankData(): IUserBank {
    return this.userBankData;
  }

  getUserEmploymentData(): IUserEmployment {
    return this.userEmploymentData;
  }

  getUserPersonalData(): IUserPersonal {
    return this.userPersonalData;
  }

  getUserPersonalDataAPI(): Observable<IUserPersonal> {
    return this.http.get<IUserPersonal>(API.GET_USER_PERSONAL_DATA, { headers: this.headers })
      .pipe(
        tap(res => {
          this.userPersonalData = res;
        })
      );
  }

  getUserEmploymentDataAPI(): Observable<IUserEmployment> {
    return this.http.get<IUserEmployment>(API.GET_USER_EMPLOYMENT_DATA, { headers: this.headers })
      .pipe(
        tap(res => {
          this.userEmploymentData = res;
        })
      )
  }

  getUserBankDataAPI(): Observable<IUserBank> {
    return this.http.get<IUserBank>(API.GET_USER_BANK_DATA, { headers: this.headers })
      .pipe(
        tap(res => {
          this.userBankData = res;
        })
      )
  }
}
