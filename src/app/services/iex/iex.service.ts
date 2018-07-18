import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PriceService } from './price/price.service';
import { CompanyService } from './company/company.service';
import { LastService } from './last/last.service';
import { Company } from './interfaces/company';
import { LightweightStockQuote } from './interfaces/lightweight-stock-quote';

@Injectable({
  providedIn: 'root'
})
export class IexService {

  constructor(
    private priceService: PriceService,
    private companyService: CompanyService,
    private lastService: LastService
  ) { }

  // List of services needed
  // GET /tops (maybe)
  // GET /ref-data/symbols (maybe)
  // GET /stock/{symbol}/chart/{range} (maybe)
  // GET /stock/{symbol}/stats
  // GET /stock/market/list...
  // GET /stock/{symbol}/logo
  // GET /stock/{symbol}/quote

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
}
