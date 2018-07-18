import { Component } from '@angular/core';

import { PriceService } from './services/price/price.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  price: Number;

  constructor(
    private priceService: PriceService
  ) { }

  ngOnInit(): void {
    this.priceService.getPrice('MSFT')
      .subscribe(price => this.price = price);
  }
}
