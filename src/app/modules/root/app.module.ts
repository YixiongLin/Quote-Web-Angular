import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { QuoteDataService } from '../../core/http/quote/quote-data.service';
import { HeaderComponent } from '../../core/header/header.component';
import { QuoteDetailComponent } from '../quotes/components/quote-detail/quote-detail.component';
import { QuoteListComponent } from '../quotes/components/quote-list/quote-list.component';
import { LoginComponent } from '../quotes/components/login/login.component';
import { AuthService } from '../../core/authentications/auth.service';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { MyFirstAttrDirective } from '../../shared/Directives/myFirstAttr.directive';
import { TokenInterceptor } from '../../core/interceptors/token/token.interceptor';
import { QuotesComponent } from '../quotes/pages/quotes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuoteDetailComponent,
    QuoteListComponent,
    LoginComponent,
    MyFirstAttrDirective,
    QuotesComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    MatToolbarModule,
    NgbModule,
    NgxPaginationModule,
    OrderModule
  ],
  providers: [AuthService,QuoteDataService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
