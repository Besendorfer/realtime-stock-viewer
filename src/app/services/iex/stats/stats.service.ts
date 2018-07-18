import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Constants } from '../iex.service.constants';
import { Stats } from '../interfaces/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private statsUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/stats`;

  constructor(
    private http: HttpClient
  ) { }

  getCompanyStats(symbol: string): Observable<Stats> {
    const url = this.statsUrl(symbol);
    return this.http.get<Stats>(url)
                    .pipe(
                      //TODO: add error handling
                    );
  }
}
