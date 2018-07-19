import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, noop } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// services
import { ErrorService } from '../../error/error.service';

// interfaces
import { LightweightStockQuote } from '../interfaces/lightweight-stock-quote';

// constants
import { Constants } from '../iex.service.constants';
import { GlobalConstants } from '../../../global.constants';

@Injectable({
  providedIn: 'root'
})
export class LastService {

  private lastUrl = Constants.BASE_API_URL + '/tops/last';

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  getAllStocksLastTradeData(): Observable<LightweightStockQuote[]> {
    return this.http.get<LightweightStockQuote[]>(this.lastUrl)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log('attempted to retrieve the last trade data for all stocks')
                             : noop()),
                      catchError(this.error.handleError<LightweightStockQuote[]>(`getAllStocksLastTradeData`))
                    );
  }

  getLastTradeData(symbols: string[]): Observable<LightweightStockQuote[]> {
    // generate url
    const csvUrl = this.lastUrl + '?symbols=' + symbols.map(symbol => encodeURIComponent(symbol)).join(',');
    return this.http.get<LightweightStockQuote[]>(csvUrl)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log(`attempted to retrieve the last trade data for ${symbols.join(', ')}`)
                             : noop()),
                      catchError(this.error.handleError<LightweightStockQuote[]>(`getLastTradeData symbols=${symbols.join(', ')}`))
                    );
  }
}
