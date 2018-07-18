import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Constants } from '../iex.service.constants';
import { LightweightStockQuote } from '../interfaces/lightweight-stock-quote';

@Injectable({
  providedIn: 'root'
})
export class LastService {

  private lastUrl = Constants.BASE_API_URL + '/tops/last';

  constructor(
    private http: HttpClient
  ) { }

  getAllSymbolsLastTradeData(): Observable<LightweightStockQuote[]> {
    return this.http.get<LightweightStockQuote[]>(this.lastUrl)
                    .pipe(
                      // TODO: add error handling
                    );
  }

  getLastTradeData(symbols: string[]): Observable<LightweightStockQuote[]> {
    // generate url
    const csvUrl = this.lastUrl + '?symbols=' + symbols.map(symbol => encodeURIComponent(symbol)).join(',');
    return this.http.get<LightweightStockQuote[]>(csvUrl)
                    .pipe(
                      // TODO: add error handling
                    );
  }
}
