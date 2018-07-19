import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// services
import { CompanyService } from './company.service';

// interfaces
import { Company } from '../interfaces/company';

describe('CompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });
  });

  it('should be created', inject([CompanyService], (service: CompanyService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected company data for MSFT', inject([HttpTestingController, CompanyService],
      (httpMock: HttpTestingController, companyService: CompanyService) => {
    const mockCompany: Company = {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      exchange: 'Nasdaq Global Select',
      industry: 'Application Software',
      website: 'http://www.microsoft.com',
      description: 'Microsoft Corp is a technology company...',
      CEO: 'Satya Nadella',
      issueType: 'cs',
      sector: 'Technology'
    }

    companyService.getCompanyInfo('MSFT').subscribe(
      company => expect(company).toEqual(mockCompany)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/MSFT/company');
    expect(req.request.method).toEqual('GET');

    req.flush(mockCompany);

    httpMock.verify();
  }));

  it('should handle null values', inject([HttpTestingController, CompanyService],
      (httpMock: HttpTestingController, companyService: CompanyService) => {
    const mockCompany: Company = {
      symbol: 'MSFT',
      companyName: null,
      exchange: 'Nasdaq Global Select',
      industry: 'Application Software',
      website: 'http://www.microsoft.com',
      description: 'Microsoft Corp is a technology company...',
      CEO: 'Satya Nadella',
      issueType: 'cs',
      sector: null
    }

    companyService.getCompanyInfo('MSFT').subscribe(
      company => expect(company).toEqual(mockCompany)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/MSFT/company');
    expect(req.request.method).toEqual('GET');

    req.flush(mockCompany);

    httpMock.verify();
  }));
});
