import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Constants } from '../iex.service.constants';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private priceUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/price`;

  constructor(
    private http: HttpClient
  ) { }

  getPrice(symbol: string): Observable<Number> {
    const url = this.priceUrl(symbol);
    return this.http.get<Number>(url)
            .pipe(
              // TODO: add error handling
            );
  }
}
