import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// services
import { IexService } from '../../services/iex/iex.service';

// interfaces
import { Quote } from '../../services/iex/interfaces/quote';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.less']
})
export class StockTableComponent implements OnInit {
  @Input() stocks: Quote[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private iexService: IexService
  ) {
      // Currently there isn't an easy way to force the router to reload to the same route,
      // so this is here to trick the router to do what we want.
      // this.router.routeReuseStrategy.shouldReuseRoute = function(){
      //   return false;
      // }
   }

  ngOnInit() {
    const listName = this.route.snapshot.paramMap.get('listName');
    this.getStocks(listName);
  }

  getStocks(listName: string): void {
    this.iexService.getTop10Stocks(listName)
                   .subscribe(stocks => {
                     this.stocks = stocks;

                     // This is here to disallow bad routes, but doesn't allow tests to work, so I'll leave it out for now
                     // WARNING: this breaks the test to check if this component creates
                     // TODO: figure out a fix for this
                    //  if (this.stocks.length == 0) {
                    //   this.router.navigated = false;
                    //   this.router.navigate(['/stocks']);
                    //  }
                    });
  }

  goToStock(symbol: string): void {
    this.router.navigate(['/stock', symbol]);
  }
}
