import { NgModule } from '@angular/core';
import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './pages/quotes.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { QuoteDataService } from '../../core/http/quote/quote-data.service';
import { QuoteDetailComponent } from './components/quote-detail/quote-detail.component';
import { AuthService } from '../../core/authentications/auth.service';
import { TokenInterceptor } from '../../core/interceptors/token/token.interceptor'
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        QuotesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        MatToolbarModule,
        NgbModule,
        NgxPaginationModule,
        OrderModule
    ],
    declarations: [
        // QuotesComponent,
        // QuoteListComponent,
        // QuoteDetailComponent,
        // SearchPipe
    ],
    providers: [
        AuthService,QuoteDataService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    ]
})

export class QuotesModule { }