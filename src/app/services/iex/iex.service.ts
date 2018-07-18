import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// services
import { PriceService } from './price/price.service';
import { CompanyService } from './company/company.service';
import { LastService } from './last/last.service';
import { StatsService } from './stats/stats.service';
import { LogoService } from './logo/logo.service';
import { QuoteService } from './quote/quote.service';

// interfaces
import { Company } from './interfaces/company';
import { LightweightStockQuote } from './interfaces/lightweight-stock-quote';
import { Stats } from './interfaces/stats';
import { Logo } from './interfaces/logo';
import { Quote } from './interfaces/quote';

@Injectable({
  providedIn: 'root'
})
export class IexService {

  constructor(
    private priceService: PriceService,
    private companyService: CompanyService,
    private lastService: LastService,
    private statsService: StatsService,
    private logoService: LogoService,
    private quoteService: QuoteService
  ) { }

  // List of services needed
  // GET /tops (maybe) (use the filter parameter?)
  // GET /ref-data/symbols (maybe)
  // GET /stock/{symbol}/chart/{range} (maybe)
  // GET /stock/market/list...

  getSymbolPrice(symbol: string): Observable<Number> {
    return this.priceService.getSymbolPrice(symbol);
  }

  getCompanyInfo(symbol: string): Observable<Company> {
    return this.companyService.getCompanyInfo(symbol);
  }

  getAllSymbolsLastTradeData(): Observable<LightweightStockQuote[]> {
    return this.lastService.getAllSymbolsLastTradeData();
  }

  getLastTradeData(symbols: string[]): Observable<LightweightStockQuote[]> {
    return this.lastService.getLastTradeData(symbols);
  }
  
  getCompanyStats(symbol: string): Observable<Stats> {
    return this.statsService.getCompanyStats(symbol);
  }

  getCompanyLogo(symbol: string): Observable<Logo> {
    return this.logoService.getCompanyLogo(symbol);
  }

  getCompanyQuote(symbol: string): Observable<Quote> {
    return this.quoteService.getCompanyQuote(symbol);
  }
}
