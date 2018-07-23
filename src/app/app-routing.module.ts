import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockTableComponent } from './main/stock-table/stock-table.component';
import { StockComponent } from './main/stock/stock.component';

const routes: Routes = [
  { path: '', redirectTo: '/stocks/all/1', pathMatch: 'full' },
  { path: 'stocks', redirectTo: '/stocks/all/1', pathMatch: 'full' },
  { path: 'stocks/:listName', redirectTo: '/stocks/:listName/1', pathMatch: 'full' },
  { path: 'stocks/:listName/:page', component: StockTableComponent },
  { path: 'stock/:symbol', component: StockComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
