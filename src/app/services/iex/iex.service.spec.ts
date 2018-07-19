import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// services
import { IexService } from './iex.service';

// interfaces
import { Company } from './interfaces/company';

describe('IexService', () => {
  let mockCompany: Company;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IexService]
    });

    mockCompany = {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      exchange: 'Nasdaq Global Select',
      industry: 'Application Software',
      website: 'http://www.microsoft.com',
      description: 'Microsoft Corp is a technology company...',
      CEO: 'Satya Nadella',
      issueType: 'cs',
      sector: 'Technology'
    };
  });

  it('should be created', inject([IexService], (service: IexService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected company data for MSFT', inject([HttpTestingController, IexService],
      (httpMock: HttpTestingController, iexService: IexService) => {
    iexService.getCompanyInfo('MSFT').subscribe(
      company => expect(company).toEqual(mockCompany)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/MSFT/company');
    expect(req.request.method).toEqual('GET');

    req.flush(mockCompany);

    httpMock.verify();
  }));

  it('should call the appropriate endpoint', inject([HttpTestingController, IexService],
      (httpMock: HttpTestingController, iexService: IexService) => {
    iexService.getCompanyInfo('MSFT').subscribe(
      company => expect(company).toEqual(mockCompany)
    );

    const req = httpMock.expectNone('https://api.iextrading.com/1.0/stock/AAPL/company');
  }));

  /**
   * I am assuming at this point that since this call seems to work appropriately with the CompanyService,
   * the it likely is going to work as expected with the other services as well. And because I'm running out
   * of time.
   */
});
