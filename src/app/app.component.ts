import { Component } from '@angular/core';

// services
import { IexService } from './services/iex/iex.service';

// interfaces
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
  }
}
