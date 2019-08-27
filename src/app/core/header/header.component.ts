import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { quote } from '../../shared/models/quote.model';
import { QuoteDataService } from '../http/quote/quote-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private newQuoteForm: FormGroup;
  closeResult: string;
  lastQuoteID: number;
  navigationSub;
  dataSub = new Subscription();

  // private newQuote: quote;
  constructor(private modalService: NgbModal, 
    private quoteService: QuoteDataService,
    private myRouter: Router) { 
      this.navigationSub = this.myRouter.events.subscribe((e:any)=>{
        if (e instanceof NavigationEnd){
          this.initializeHeader();
        }
      })
    }

  ngOnInit() {
    this.initializeHeader();
  }

  initializeHeader(){
    this.dataSub = this.quoteService.getQuotesData().subscribe(data=>{
      let index = Object(data).length-1;
      this.lastQuoteID = Object(data[index]).ID;
    })
    this.newQuoteForm = new FormGroup({
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

  open(newQuote) {
    this.modalService.open(newQuote, { ariaLabelledBy: 'modal-newQuote-title', size: 'lg' })
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

  quoteSubmit() {
    if (this.newQuoteForm.status === 'VALID') {
      var outputQuote = new quote(this.lastQuoteID+1,
        this.newQuoteForm.get('quoteType').value,
        this.newQuoteForm.get('quoteNumber').value,
        this.newQuoteForm.get('quoteDetail').value,
        parseFloat(this.newQuoteForm.get('price').value),
        this.newQuoteForm.get('dueDate').value);
      this.quoteService.postQuote(outputQuote).subscribe(
        res => {
          alert("Create New Quote Successfully!");
          this.myRouter.navigate(['../quotes']);
      });
      this.newQuoteForm.reset();
      }
  }

  signUp(){
    this.myRouter.navigate(['../login']);
  }

  logout(){
    if(this.quoteService.isUserLogin() !== false){
      this.quoteService.onUserLogout()
    }
    this.myRouter.navigate(['/']);
  }

  ngOnDestroy(){
    this.dataSub.unsubscribe();
    this.navigationSub.unsubscribe();
  }
}
