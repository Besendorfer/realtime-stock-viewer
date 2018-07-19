import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
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
    private router: Router,
    private iexService: IexService
  ) { }

  ngOnInit() {
    this.stock = <Stock>{};
    const symbol = this.route.snapshot.paramMap.get('symbol');
    this.getCompanyAndStockInfo(symbol);
    console.log(this.stock);
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

          // ensure that the stock exists first
          if (this.stock == null || this.stock.company == null || this.stock.quote == null) {
            this.router.navigate(['/stocks']);
          }

          if (this.stock != null && this.stock.company != null) {
            // TODO: put this in a helper class. Also determine if there is a functional way to do this
            for (const key of Object.keys(this.stock.company)) {
              if (this.stock.company[key] == null || this.stock.company[key] == '') {
                this.stock.company[key] = 'N/A';
              }
            }
          }

          if (this.stock != null && this.stock.quote != null) {
            for (const key of Object.keys(this.stock.quote)) {
              if (this.stock.quote[key] == null || this.stock.quote[key] == '') {
                this.stock.quote[key] = 'N/A';
              }
            }
          }

        });
  }

}
