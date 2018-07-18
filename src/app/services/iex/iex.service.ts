import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PriceService } from './price/price.service';
import { CompanyService } from './company/company.service';
import { Company } from './interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class IexService {

  constructor(
    private priceService: PriceService,
    private companyService: CompanyService
  ) { }

  // List of services needed
  // GET /tops (maybe)
  // GET /tops/last
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
}
