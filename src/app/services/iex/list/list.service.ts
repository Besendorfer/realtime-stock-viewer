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
export class ListService {

  private listUrl = Constants.BASE_API_URL + '/stock/market/list';

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  /**
   * available lists:
   *   - mostactive
   *   - gainers
   *   - losers
   *   - iexvolume
   *   - iexpercent
   */
  getTop10Stocks(listName: string): Observable<Quote[]> {
    const url = this.listUrl + '/' + listName;
    return this.http.get<Quote[]>(url)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log(`attempted to retrieve the top 10 stocks for ${listName}`)
                             : noop()),
                      catchError(this.error.handleError<Quote[]>(`getTop10Stocks listName=${listName}`))
                    );
  }
}
