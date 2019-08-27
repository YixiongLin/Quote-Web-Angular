import { Component, OnInit } from '@angular/core';
import { QuoteDataService } from 'src/app/core/http/quote/quote-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private quoteService: QuoteDataService, private myRouter: Router) { }

  ngOnInit() {
  }

  login(){
    if(this.quoteService.isUserLogin() !== true){
      this.quoteService.onUserLogin();
    }
    this.myRouter.navigate(['../quotes']);
  }
  
}
