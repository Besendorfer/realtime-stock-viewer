import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// services
import { StatsService } from './stats.service';

// interfaces
import { Stats } from '../interfaces/stats';

describe('StatsService', () => {
  let mockStats: Stats;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatsService]
    });

    mockStats = {
      companyName: 'Apple Inc.',
      marketcap: 760334287200,
      beta: 1.295227,
      week52high: 156.65,
      week52low: 93.63,
      week52change: 58.801903,
      shortInterest: 55544287,
      shortDate: '2017-06-15',
      dividendRate: 2.52,
      dividendYield: 1.7280395,
      exDividendDate: '2017-05-11 00:00:00.0',
      latestEPS: 8.29,
      latestEPSDate: '2016-09-30',
      sharesOutstanding: 5213840000,
      float: 5203997571,
      returnOnEquity: 0.08772939519857577,
      consensusEPS: 3.22,
      numberOfEstimates: 15,
      symbol: 'AAPL',
      EBITDA: 73828000000,
      revenue: 220457000000,
      grossProfit: 84686000000,
      cash: 256464000000,
      debt: 358038000000,
      ttmEPS: 8.55,
      revenuePerShare: 42.2830389885382,
      revenuePerEmployee: 1900491.3793103448,
      peRatioHigh: 25.5,
      peRatioLow: 8.7,
      EPSSurpriseDollar: null,
      EPSSurprisePercent: 3.9604,
      returnOnAssets: 14.15,
      returnOnCapital: null,
      profitMargin: 20.73,
      priceToSales: 3.6668503,
      priceToBook: 6.19,
      day200MovingAvg: 140.60541,
      day50MovingAvg: 156.49678,
      institutionPercent: 32.1,
      insiderPercent: null,
      shortRatio: 1.6915414,
      year5ChangePercent: 0.5902546932200027,
      year2ChangePercent: 0.3777449874142869,
      year1ChangePercent: 0.39751716851558366,
      ytdChangePercent: 0.36659492036160124,
      month6ChangePercent: 0.12208398133748043,
      month3ChangePercent: 0.08466584665846649,
      month1ChangePercent: 0.009668596145283263,
      day5ChangePercent: -0.005762605699968781
    };
  });

  it('should be created', inject([StatsService], (service: StatsService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected company stats for AAPL', inject([HttpTestingController, StatsService],
      (httpMock: HttpTestingController, statsService: StatsService) => {
    statsService.getCompanyStats('AAPL').subscribe(
      stats => expect(stats).toEqual(mockStats)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/AAPL/stats');
    expect(req.request.method).toEqual('GET');

    req.flush(mockStats);

    httpMock.verify();
  }));

  it('should handle null values', inject([HttpTestingController, StatsService],
      (httpMock: HttpTestingController, statsService: StatsService) => {
    mockStats.beta = null;
    mockStats.companyName = null;

    statsService.getCompanyStats('AAPL').subscribe(
      stats => expect(stats).toEqual(mockStats)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/AAPL/stats');
    expect(req.request.method).toEqual('GET');

    req.flush(mockStats);

    httpMock.verify();
  }));
});
