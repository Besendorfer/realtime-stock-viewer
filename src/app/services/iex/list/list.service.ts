import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Constants } from '../iex.service.constants';
import { Quote } from '../interfaces/quote';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listUrl = Constants.BASE_API_URL + '/stock/market/list';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * available lists:
   *   - /mostactive
   *   - /gainers
   *   - /losers
   *   - /iexvolume
   *   - /iexpercent
   */
  getTop10Symbols(listName: string): Observable<Quote[]> {
    const url = this.listUrl + '/' + listName;
    return this.http.get<Quote[]>(url)
                    .pipe(
                      // TODO: add error handling
                    );
  }
}
