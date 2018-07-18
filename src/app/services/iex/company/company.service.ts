import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Constants } from '../iex.service.constants';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = (symbol: string) => Constants.BASE_API_URL + `/stock/${symbol}/company`;

  constructor(
    private http: HttpClient
  ) { }

  getCompanyInfo(symbol: string): Observable<Company> {
    const url = this.companyUrl(symbol);
    return this.http.get<Company>(url)
            .pipe(
              // TODO: add error handling
            );
  }
}
