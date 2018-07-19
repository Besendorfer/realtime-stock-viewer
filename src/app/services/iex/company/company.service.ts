import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, noop } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// services
import { ErrorService } from '../../error/error.service';

// interfaces
import { Company } from '../interfaces/company';

// constants
import { Constants } from '../iex.service.constants';
import { GlobalConstants } from '../../../global.constants';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/company`;

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  getCompanyInfo(symbol: string): Observable<Company> {
    const url = this.companyUrl(symbol);
    return this.http.get<Company>(url)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log(`attempted to retrieve the company information for ${symbol}`)
                             : noop()),
                      catchError(this.error.handleError<Company>(`getCompanyInfo symbol=${symbol}`))
                    );
  }
}
