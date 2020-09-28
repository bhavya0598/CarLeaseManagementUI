import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';
import * as jwt_decode from "jwt-decode";
import * as moment from "moment";
import { IToken } from '../../shared/interfaces/IToken';
import { API } from 'src/app/shared/constants/const';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: HttpHeaders;
  logoutSubject = new Subject<boolean>();
  
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  }

  login(loginForm: FormGroup) {
    var body = JSON.stringify(loginForm.getRawValue());
    return this.http.post(API.LOGIN, body, { headers: this.headers })
      .pipe(
        tap((res: { token: string }) => {
          this.setToken(res);
          this.logoutSubject.next(true);
        })
      );
  }

  register(registerForm: FormGroup): Observable<any> {
    var body = JSON.stringify(registerForm.getRawValue());
    return this.http.post<any>(API.REGISTER, body, { headers: this.headers })
  }

  verification(registerForm: FormGroup): Observable<any> {
    var body = JSON.stringify(registerForm.getRawValue());
    return this.http.post(API.VERIFY_EMAIL, body, { headers: this.headers });
  }

  private setToken(response: { token: string }) {
    var jwt: IToken = jwt_decode(response.token);
    var expireIn = jwt.exp;
    var userId = jwt.UserId;
    const expiresAt = moment().add(expireIn, 'second');
    localStorage.setItem('token', response.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('userId', userId );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserId(){
    return localStorage.getItem('userId');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logout() {
    localStorage.clear();
  }
}
