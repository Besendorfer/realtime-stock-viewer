import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PriceService } from './price/price.service';

@Injectable({
  providedIn: 'root'
})
export class IexService {

  constructor(
    private priceService: PriceService
  ) { }

  // List of services needed
  // GET /tops (maybe)
  // GET /tops/last
  // GET /ref-data/symbols (maybe)
  // GET /stock/{symbol}/chart/{range} (maybe)
  // GET /stock/{symbol}/company
  // GET /stock/{symbol}/stats
  // GET /stock/market/list...
  // GET /stock/{symbol}/logo
  // GET /stock/{symbol}/price
  // GET /stock/{symbol}/quote

  getSymbolPrice(symbol: string): Observable<Number> {
    return this.priceService.getSymbolPrice(symbol);
  }
}
