import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { QuoteDataService } from '../http/quote/quote-data.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteResolverService implements Resolve<any> {
  quoteData: {}
  constructor(private quoteService: QuoteDataService) { }

  resolve(){
    return this.quoteService.getQuotesData();
  }

  resolveSingle(id: number){
    return this.quoteService.getQuoteByID(id);
  }
}
