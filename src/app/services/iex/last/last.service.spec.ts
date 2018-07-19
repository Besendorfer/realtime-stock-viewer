import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// services
import { LastService } from './last.service';

// interfaces
import { LightweightStockQuote } from '../interfaces/lightweight-stock-quote';

describe('LastService', () => {
  let mockLightweightStockQuoteArray: LightweightStockQuote[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LastService]
    });

    mockLightweightStockQuoteArray = [
      {
        symbol: 'SNAP',
        price: 111.76,
        size: 5,
        time: 1480446905681
      },
      {
        symbol: "FB",
        price: 121.41,
        size: 100,
        time: 1480446908666
      },
      {
        symbol: "AIG+",
        price: 21.52,
        size: 100,
        time: 1480446206461
      }
    ];
  });

  it('should be created', inject([LastService], (service: LastService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected last trade data for "all stocks"', inject([HttpTestingController, LastService],
      (httpMock: HttpTestingController, lastService: LastService) => {


    lastService.getAllStocksLastTradeData().subscribe(
      lightweightStockQuoteArray => expect(lightweightStockQuoteArray)
                                    .toEqual(mockLightweightStockQuoteArray)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/tops/last');
    expect(req.request.method).toEqual('GET');

    req.flush(mockLightweightStockQuoteArray);

    httpMock.verify();
  }));

  it('should get the expected last trade data for SNAP, FB, AIG+', inject([HttpTestingController, LastService],
      (httpMock: HttpTestingController, lastService: LastService) => {

    lastService.getLastTradeData(['SNAP','fb','AIG+']).subscribe(
      lightweightStockQuoteArray => expect(lightweightStockQuoteArray)
                                    .toEqual(mockLightweightStockQuoteArray)
    );

    // Check if the array properly joins and the items are encoded correctly
    const req = httpMock.expectOne('https://api.iextrading.com/1.0/tops/last?symbols=SNAP,fb,AIG%2B');
    expect(req.request.method).toEqual('GET');

    req.flush(mockLightweightStockQuoteArray);

    httpMock.verify();
  }));

  it('should handle null values', inject([HttpTestingController, LastService],
      (httpMock: HttpTestingController, lastService: LastService) => {
    mockLightweightStockQuoteArray = [
      {
        symbol: null,
        price: 111.76,
        size: 5,
        time: null
      },
      {
        symbol: "FB",
        price: 121.41,
        size: 100,
        time: 1480446908666
      },
      {
        symbol: "AIG+",
        price: 21.52,
        size: 100,
        time: 1480446206461
      },
      null
    ];

    lastService.getLastTradeData(['SNAP','fb','AIG+']).subscribe(
      lightweightStockQuoteArray => expect(lightweightStockQuoteArray)
                                    .toEqual(mockLightweightStockQuoteArray)
    );

    // Check if the array properly joins and the items are encoded correctly
    const req = httpMock.expectOne('https://api.iextrading.com/1.0/tops/last?symbols=SNAP,fb,AIG%2B');
    expect(req.request.method).toEqual('GET');

    req.flush(mockLightweightStockQuoteArray);

    httpMock.verify();
  }));
});
