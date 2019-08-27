import { Component, OnInit } from '@angular/core';
import { QuoteDataService } from '../../../core/http/quote/quote-data.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private lastQuoteID: number;
  constructor(private myService: QuoteDataService){}
  ngOnInit(){
  }

  getLastID(id: number){
    this.lastQuoteID = id;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
