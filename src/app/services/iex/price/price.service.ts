import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, noop } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// services
import { ErrorService } from '../../error/error.service';

// constants
import { Constants } from '../iex.service.constants';
import { GlobalConstants } from '../../../global.constants';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private priceUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/price`;

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  getStockPrice(symbol: string): Observable<Number> {
    const url = this.priceUrl(symbol);
    return this.http.get<Number>(url)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log(`attempted to retrieve the stock price for ${symbol}`)
                             : noop()),
                      catchError(this.error.handleError<Number>(`getStockPrice symbol=${symbol}`))
                    );
  }
}
