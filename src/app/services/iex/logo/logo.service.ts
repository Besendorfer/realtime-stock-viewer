import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, noop } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// services
import { ErrorService } from '../../error/error.service';

// interfaces
import { Logo } from '../interfaces/logo';

// constants
import { Constants } from '../iex.service.constants';
import { GlobalConstants } from '../../../global.constants';

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  private logoUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/logo`;

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  getCompanyLogo(symbol: string): Observable<Logo> {
    const url = this.logoUrl(symbol);
    return this.http.get<Logo>(url)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log(`attempted to retrieve the company logo for ${symbol}`)
                             : noop()),
                      catchError(this.error.handleError<Logo>(`getCompanyLogo symbol=${symbol}`))
                    );
  }
}
