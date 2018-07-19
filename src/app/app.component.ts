import { Component } from '@angular/core';

import { IexService } from './services/iex/iex.service';
import { Company } from './services/iex/interfaces/company';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  price: Number;
  company: Company;

  constructor(
    private iexService: IexService
  ) { }

  ngOnInit(): void {
    this.iexService.getStockPrice('MSFT')
      .subscribe(price => this.price = price);

    this.iexService.getCompanyInfo('MSFT')
      .subscribe(company => this.company = company);
  }
}
