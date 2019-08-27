import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuoteDataService } from 'src/app/core/http/quote/quote-data.service';
import { quote } from 'src/app/shared/models/quote.model';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.css']
})
export class QuoteDetailComponent implements OnInit, OnDestroy {

  private quoteID = '';
  private myQuote:quote;
  mySubs = new Subscription();
  constructor(private activatedRoute: ActivatedRoute, private quoteService: QuoteDataService) { }

  ngOnInit() {
    this.mySubs = this.activatedRoute.params.subscribe(data=>{
      this.quoteID = data['id'];
    });
    if(this.quoteID !== ''){
      this.mySubs = this.quoteService.getQuoteByID(parseInt(this.quoteID)).subscribe(rawData=>{
        this.myQuote = rawData;
        console.log(this.myQuote);
      });
    }
  }

  ngOnDestroy(){
    this.mySubs.unsubscribe();
  }
}
