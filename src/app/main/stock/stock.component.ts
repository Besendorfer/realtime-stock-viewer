import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

// services
import { IexService } from '../../services/iex/iex.service';

// interfaces
import { Stock } from './interfaces/stock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent implements OnInit {
  @Input() stock: Stock;

  constructor(
    private route: ActivatedRoute,
    private iexService: IexService
  ) { }

  ngOnInit() {
    this.stock = <Stock>{};
    const symbol = this.route.snapshot.paramMap.get('symbol');
    this.getCompanyAndStockInfo(symbol);
  }

  getCompanyAndStockInfo(symbol: string) {
    let companyInfo = this.iexService.getCompanyInfo(symbol);
    let companyQuote = this.iexService.getCompanyQuote(symbol);

    forkJoin(companyInfo, companyQuote)
      .subscribe(response =>
        {
          // forkJoin guarantees that companyInfo goes into the first location in the array,
          // and companyQuote goes into the second location
          this.stock.company = response[0];
          this.stock.quote = response[1];
        });
  }

}
