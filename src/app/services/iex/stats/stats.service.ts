import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, noop } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// services
import { ErrorService } from '../../error/error.service';

// interfaces
import { Stats } from '../interfaces/stats';

// constants
import { Constants } from '../iex.service.constants';
import { GlobalConstants } from '../../../global.constants';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private statsUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/stats`;

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  getCompanyStats(symbol: string): Observable<Stats> {
    const url = this.statsUrl(symbol);
    return this.http.get<Stats>(url)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log(`attempted to retrieve the company stats for ${symbol}`)
                             : noop()),
                      catchError(this.error.handleError<Stats>(`getCompanyStats symbol=${symbol}`))
                    );
  }
}
