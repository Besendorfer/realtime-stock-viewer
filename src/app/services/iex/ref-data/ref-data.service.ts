import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, noop } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// services
import { ErrorService } from '../../error/error.service';

// interfaces
import { RefData } from '../interfaces/ref-data';

// constants
import { Constants } from '../iex.service.constants';
import { GlobalConstants } from '../../../global.constants';

@Injectable({
  providedIn: 'root'
})
export class RefDataService {

  private refDataUrl = Constants.BASE_API_URL + '/ref-data/symbols';

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  getRefData(): Observable<RefData[]> {
    return this.http.get<RefData[]>(this.refDataUrl)
                    .pipe(
                      tap(_ => GlobalConstants.debug
                             ? console.log(`attempted to retrieve ref-data symbols`)
                             : noop()),
                      catchError(this.error.handleError<RefData[]>(`getRefData`))
                    );
  }
}
