import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Constants } from '../iex.service.constants';
import { Logo } from '../interfaces/logo';

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  private logoUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/logo`;

  constructor(
    private http: HttpClient
  ) { }

  getCompanyLogo(symbol: string): Observable<Logo> {
    const url = this.logoUrl(symbol);
    return this.http.get<Logo>(url)
                    .pipe(
                      // TODO: add error handling
                    );
  }
}
