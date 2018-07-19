import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// services
import { ListService } from './list.service';

// interfaces
import { Quote } from '../interfaces/quote';

describe('ListService', () => {
  let mockList: Quote[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ListService]
    });

    mockList = [
      {
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
      }
    ]
  });

  it('should be created', inject([ListService], (service: ListService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected data for each list', inject([HttpTestingController, ListService],
      (httpMock: HttpTestingController, listService: ListService) => {
    listService.getTop10Stocks('mostactive').subscribe(
      list => expect(list).toEqual(mockList)
    );

    let req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/market/list/mostactive');
    expect(req.request.method).toEqual('GET');

    req.flush(mockList);

    httpMock.verify();

    ///////////////////////////////////////////////////////////////////////////////////////////////

    listService.getTop10Stocks('gainers').subscribe(
      list => expect(list).toEqual(mockList)
    );

    req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/market/list/gainers');
    expect(req.request.method).toEqual('GET');

    req.flush(mockList);

    httpMock.verify();

    ///////////////////////////////////////////////////////////////////////////////////////////////

    listService.getTop10Stocks('losers').subscribe(
      list => expect(list).toEqual(mockList)
    );

    req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/market/list/losers');
    expect(req.request.method).toEqual('GET');

    req.flush(mockList);

    httpMock.verify();

    ///////////////////////////////////////////////////////////////////////////////////////////////

    listService.getTop10Stocks('iexvolume').subscribe(
      list => expect(list).toEqual(mockList)
    );

    req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/market/list/iexvolume');
    expect(req.request.method).toEqual('GET');

    req.flush(mockList);

    httpMock.verify();

    ///////////////////////////////////////////////////////////////////////////////////////////////

    listService.getTop10Stocks('iexpercent').subscribe(
      list => expect(list).toEqual(mockList)
    );

    req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/market/list/iexpercent');
    expect(req.request.method).toEqual('GET');

    req.flush(mockList);

    httpMock.verify();
  }));

  it('should return an empty array when given a bad list', inject([HttpTestingController, ListService],
      (httpMock: HttpTestingController, listService: ListService) => {
    listService.getTop10Stocks('marketcap').subscribe(
      list => expect(list).toEqual([])
    );

    const req = httpMock.expectNone('https://api.iextrading.com/1.0/stock/market/list/marketcap');

    httpMock.verify();
  }));
});
