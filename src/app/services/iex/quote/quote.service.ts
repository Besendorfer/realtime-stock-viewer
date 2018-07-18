import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Constants } from '../iex.service.constants';
import { Quote } from '../interfaces/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private quoteUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/quote`;

  constructor(
    private http: HttpClient
  ) { }

  getCompanyQuote(symbol: string): Observable<Quote> {
    const url = this.quoteUrl(symbol);
    return this.http.get<Quote>(url)
                    .pipe(
                      // TODO: add error handling
                    );
  }
}
