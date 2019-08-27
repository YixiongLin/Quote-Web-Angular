import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteListComponent } from '../quotes/components/quote-list/quote-list.component';
import { QuoteResolverService } from '../../core/guards/quote-resolver.service';
import { LoginComponent } from '../quotes/components/login/login.component';
import { QuoteDetailComponent } from '../quotes/components/quote-detail/quote-detail.component';
import { AuthService } from '../../core/authentications/auth.service';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'quotes', component: QuoteListComponent, data: {animation: 'ListPage'}, resolve: {quoteData: QuoteResolverService}, canActivate:[AuthService], runGuardsAndResolvers: 'always'},
  {path: 'quote/:id', component: QuoteDetailComponent, canActivate:[AuthService]},
  //{path: 'quotes', loadChildren: '../app/modules/quotes/quotes.module#QuotesModule' },

  {path:'',redirectTo: '/', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
