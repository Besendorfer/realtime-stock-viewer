import { Component } from '@angular/core';

import { IexService } from './services/iex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  price: Number;

  constructor(
    private iexService: IexService
  ) { }

  ngOnInit(): void {
    this.iexService.getSymbolPrice('MSFT')
      .subscribe(price => this.price = price);
  }
}
