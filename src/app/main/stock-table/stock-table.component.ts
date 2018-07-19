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
  ) { }

  ngOnInit() {
    const listName = this.route.snapshot.paramMap.get('listName');
    this.getStocks(listName);
  }

  getStocks(listName: string): void {
    this.iexService.getTop10Stocks(listName)
                   .subscribe(stocks => this.stocks = stocks);
  }

  goToStock(symbol: string): void {
    this.router.navigate(['stock', symbol]);
  }
}
