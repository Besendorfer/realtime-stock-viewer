import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, noop } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// services
import { ErrorService } from '../../error/error.service';

// interfaces
import { Quote } from '../interfaces/quote';

// constants
import { Constants } from '../iex.service.constants';
import { GlobalConstants } from '../../../global.constants';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private quoteUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/quote`;

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  getCompanyQuote(symbol: string): Observable<Quote> {
    const url = this.quoteUrl(symbol);
    return this.http.get<Quote>(url)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log(`attempted to retrieve the company quote for ${symbol}`)
                             : noop()),
                      catchError(this.error.handleError<Quote>(`getCompanyQuote symbol=${symbol}`))
                    );
  }
}
