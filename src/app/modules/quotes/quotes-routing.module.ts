import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './pages/quotes.component';
import { QuoteDetailComponent } from './components/quote-detail/quote-detail.component';
import { AuthService } from '../../core/authentications/auth.service';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { QuoteResolverService } from '../../core/guards/quote-resolver.service';

const routes: Routes = [
    {path: '', component: QuoteListComponent, data: {animation: 'ListPage'}, resolve: {quoteData: QuoteResolverService}, canActivate:[AuthService], runGuardsAndResolvers: 'always'},
    {path: "quote/:id", component: QuoteDetailComponent, canActivate:[AuthService]}    
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class QuotesRoutingModule {}