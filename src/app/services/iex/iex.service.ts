import { Injectable } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// services
import { PriceService } from './price/price.service';
import { CompanyService } from './company/company.service';
import { LastService } from './last/last.service';
import { StatsService } from './stats/stats.service';
import { LogoService } from './logo/logo.service';
import { QuoteService } from './quote/quote.service';
import { ListService } from './list/list.service';
import { RefDataService } from './ref-data/ref-data.service';

// interfaces
import { Company } from './interfaces/company';
import { LightweightStockQuote } from './interfaces/lightweight-stock-quote';
import { Stats } from './interfaces/stats';
import { Logo } from './interfaces/logo';
import { Quote } from './interfaces/quote';
import { RefData } from './interfaces/ref-data';

@Injectable({
  providedIn: 'root'
})
export class IexService {

  constructor(
    private priceService: PriceService,
    private companyService: CompanyService,
    private lastService: LastService,
    private statsService: StatsService,
    private logoService: LogoService,
    private quoteService: QuoteService,
    private listService: ListService,
    private refDataService: RefDataService
  ) { }

  // List of more services to potentially use
  // GET /tops (use the filter parameter?)
  // GET /ref-data/symbols
  // GET /stock/{symbol}/chart/{range}

  /**
   * Gets the stock price, retrieved from the PriceService
   * @param symbol - symbol for the desired stock
   */
  getStockPrice(symbol: string): Observable<Number> {
    return this.priceService.getStockPrice(symbol);
  }

  /**
   * Gets the company information, retrieved from the CompanyService
   * @param symbol - symbol for the desired stock
   */
  getCompanyInfo(symbol: string): Observable<Company> {
    return this.companyService.getCompanyInfo(symbol);
  }

  /**
   * Gets the most recent trade data for all symbols available in the IEX database,
   * retrieved from the LastService
   */
  getAllStocksLastTradeData(): Observable<LightweightStockQuote[]> {
    return this.lastService.getAllStocksLastTradeData();
  }

  /**
   * Gets the most recent trade data for the given symbols, retrieved from the LastService
   * @param symbols - list of symbols for the desired stocks to be quoted
   */
  getLastTradeData(symbols: string[]): Observable<LightweightStockQuote[]> {
    return this.lastService.getLastTradeData(symbols);
  }

  /**
   * Gets the company stats, retrieved from the StatsService
   * @param symbol - symbol for the desired stock
   */
  getCompanyStats(symbol: string): Observable<Stats> {
    return this.statsService.getCompanyStats(symbol);
  }

  /**
   * Gets the company logo, retrieved from the LogoService
   * @param symbol - symbol for the desired stock
   */
  getCompanyLogo(symbol: string): Observable<Logo> {
    return this.logoService.getCompanyLogo(symbol);
  }

  /**
   * Gets a quote on the desired company, retrieved from the QuoteService
   * @param symbol - symbol for the desired stock
   */
  getCompanyQuote(symbol: string): Observable<Quote> {
    return this.quoteService.getCompanyQuote(symbol);
  }

  /**
   * Gets the top 10 company quotes from the desired list, retrieved from the ListService
   * @param listName - the name of the desired top 10 list
   * listName options:
   *  - mostactive
   *  - gainers
   *  - losers
   *  - iexvolume
   *  - iexpercent
   */
  getTop10Stocks(listName: string): Observable<Quote[]> {
    return this.listService.getTop10Stocks(listName);
  }

  /**
   * Gets reference data for all symbols
   */
  getRefData(): Observable<RefData[]> {
    return this.refDataService.getRefData();
  }
}
