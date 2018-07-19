import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { StockTableComponent } from './main/stock-table/stock-table.component';
import { StockComponent } from './main/stock/stock.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { IssueTypePipe } from './main/stock/pipes/issue-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StockTableComponent,
    StockComponent,
    SearchBarComponent,
    IssueTypePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
