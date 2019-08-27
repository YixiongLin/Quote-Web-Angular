import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { quote } from '../../../shared/models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteDataService {

  private url: string = "http://localhost:80/quoteApi/api/Quote";
  private isLogin: boolean = false;

  constructor(private http: HttpClient) { }
  
  getQuotesData(): Observable<quote[]> {
    let x = new HttpHeaders();
    return this.http.get<quote[]>(this.url, { headers: x });
    //return outputArr;
  }

  getQuoteByID(ID: number) {
    let x = new HttpHeaders();
    return this.http.get<quote>(this.url + '/' + ID, { headers: x });
  }

  postQuote(quote: quote): Observable<any> {
    let x = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.post(this.url, JSON.stringify(quote), { headers: x });
  }

  putQuote(quote: quote): Observable<any> {
    let x = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.put(this.url, JSON.stringify(quote), { headers: x });
  }

  isUserLogin(){
    return this.isLogin;
  }

  onUserLogin(){
    this.isLogin = true;
  }

  onUserLogout(){
    this.isLogin = false;
  }

}
