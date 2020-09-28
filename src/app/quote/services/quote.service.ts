import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { API } from 'src/app/shared/constants/const';

@Injectable({providedIn: 'root'})
export class QuoteService {
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient,
        private authService: AuthService) {    
        this.headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.authService.getToken()
      }) }

    saveQuote(finalQuote):Observable<any> {
        return this.httpClient.post<any>(API.SAVE_QUOTE,finalQuote,{headers: this.headers})
    }
}