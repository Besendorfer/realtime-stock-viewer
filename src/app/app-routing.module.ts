import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockTableComponent } from './main/stock-table/stock-table.component';
import { StockComponent } from './main/stock/stock.component';

const routes: Routes = [
  { path: '', redirectTo: '/stocks', pathMatch: 'full' },
  { path: 'stocks', component: StockTableComponent }, // eventually it would be nice to make this /stocks/:page for pagination
  { path: 'stock/:symbol', component: StockComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
