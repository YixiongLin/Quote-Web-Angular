import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { QuoteDataService } from 'src/app/core/http/quote/quote-data.service';
import { quote } from 'src/app/shared/models/quote.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit, OnDestroy {

  private quotes: quote[];
  private pageNumber: number = 10;
  private mySubs = new Subscription();
  p: number = 1;
  private updatedQuote: quote;
  closeResult: string;
  private updateQuoteForm: FormGroup;
  isDesc: boolean = false;
  orderType: string = 'Company';
  searchQuery: string = '';
  navigationSubscription;
  
  constructor(private modalService: NgbModal, 
    private quoteService: QuoteDataService, 
    private activateRoute: ActivatedRoute,
    private myRouter: Router) { 
      this.navigationSubscription = this.myRouter.events.subscribe((e:any)=>{
        if (e instanceof NavigationEnd){
          this.initializeQuotes();
        }
      });
    }

  ngOnInit() {
    this.initializeQuotes();
  }

  initializeQuotes(){
    this.quotes = new Array();
    this.mySubs = this.activateRoute.data.subscribe(rawData => {
      this.quotes = rawData['quoteData'] as quote[];
    });
    this.updateQuoteForm = new FormGroup({
      'quoteType': new FormControl(null, Validators.required),
      'quoteNumber': new FormControl(null, [Validators.required, Validators.pattern("^[Q][T]+[0-9]{5}$")]),
      'task': new FormGroup({
        'taskType': new FormControl(null, Validators.required),
        'contact': new FormControl(null, Validators.required)
      }),
      'quoteDetail': new FormControl(null, Validators.required),
      'dueDate': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*\.?[0-9]{0,2}$")])
    });
  }

  onUpdateQuote(quote: quote){
    this.updatedQuote = quote;
    let dp = new DatePipe(navigator.language);
    let p = 'MM-dd-y';
    let dpr = dp.transform(new Date(), p);
    console.log(dpr);
    (<FormGroup>this.updateQuoteForm).setValue({
      quoteType: this.updatedQuote.Company,
      quoteNumber: this.updatedQuote.QuoteNum, 
      task:{
        taskType: 'NE',
        contact: 'NE',
      },
      quoteDetail: this.updatedQuote.Description,
      dueDate: this.updatedQuote.ExpireDate,
      price: this.updatedQuote.Price});
  }

  open(updateQuote) {
    this.modalService.open(updateQuote, { ariaLabelledBy: 'modal-updateQuote-title', size: 'lg' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissd ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  quoteUpdate(){
    if (this.updateQuoteForm.status === 'VALID') {
      var outputQuote = new quote(this.updatedQuote.ID,
        this.updateQuoteForm.get('quoteType').value,
        this.updateQuoteForm.get('quoteNumber').value,
        this.updateQuoteForm.get('quoteDetail').value,
        parseFloat(this.updateQuoteForm.get('price').value),
        this.updateQuoteForm.get('dueDate').value);
      console.log(outputQuote);
      this.quoteService.putQuote(outputQuote).subscribe(
        res => {
          alert("Update Quote Successfully!");
          this.myRouter.navigate(['../quotes']);
      });
      this.updateQuoteForm.reset();
  }
}

  ngOnDestroy(){
    this.mySubs.unsubscribe();
    this.navigationSubscription.unsubscribe();
  }
}
