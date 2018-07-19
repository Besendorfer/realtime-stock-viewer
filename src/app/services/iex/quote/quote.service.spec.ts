import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// services
import { QuoteService } from './quote.service';

// interfaces
import { Quote } from '../interfaces/quote';

describe('QuoteService', () => {
  let mockQuote: Quote;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuoteService]
    });

    mockQuote = {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      primaryExchange: 'Nasdaq Global Select',
      sector: 'Technology',
      calculationPrice: 'tops',
      open: 154,
      openTime: 1506605400394,
      close: 153.28,
      closeTime: 1506605400394,
      high: 154.80,
      low: 153.25,
      latestPrice: 158.73,
      latestSource: 'Previous close',
      latestTime: 'September 19, 2017',
      latestUpdate: 1505779200000,
      latestVolume: 20567140,
      iexRealtimePrice: 158.71,
      iexRealtimeSize: 100,
      iexLastUpdated: 1505851198059,
      delayedPrice: 158.71,
      delayedPriceTime: 1505854782437,
      extendedPrice: 159.21,
      extendedChange: -1.68,
      extendedChangePercent: -0.0125,
      extendedPriceTime: 1527082200361,
      previousClose: 158.73,
      change: -1.67,
      changePercent: -0.01158,
      iexMarketPercent: 0.00948,
      iexVolume: 82451,
      avgTotalVolume: 29623234,
      iexBidPrice: 153.01,
      iexBidSize: 100,
      iexAskPrice: 158.66,
      iexAskSize: 100,
      marketCap: 751627174400,
      peRatio: 16.86,
      week52High: 159.65,
      week52Low: 93.63,
      ytdChange: 0.3665
    };
  });

  it('should be created', inject([QuoteService], (service: QuoteService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected company quote for AAPL', inject([HttpTestingController, QuoteService],
      (httpMock: HttpTestingController, quoteService: QuoteService) => {
    quoteService.getCompanyQuote('AAPL').subscribe(
      quote => expect(quote).toEqual(mockQuote)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/AAPL/quote');
    expect(req.request.method).toEqual('GET');

    req.flush(mockQuote);

    httpMock.verify();
  }));

  it('should handle null values', inject([HttpTestingController, QuoteService],
      (httpMock: HttpTestingController, quoteService: QuoteService) => {
    mockQuote.marketCap = null;
    mockQuote.companyName = null;

    quoteService.getCompanyQuote('AAPL').subscribe(
      quote => expect(quote).toEqual(mockQuote)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/AAPL/quote');
    expect(req.request.method).toEqual('GET');

    req.flush(mockQuote);

    httpMock.verify();
  }));
});
