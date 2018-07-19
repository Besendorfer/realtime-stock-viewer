import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// services
import { LogoService } from './logo.service';

// interfaces
import { Logo } from '../interfaces/logo';

describe('LogoService', () => {
  let mockLogo: Logo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogoService]
    });

    mockLogo = {
      url: 'https://storage.googleapis.com/iex/api/logos/AAPL.png'
    }
  });

  it('should be created', inject([LogoService], (service: LogoService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected company logo for AAPL', inject([HttpTestingController, LogoService],
      (httpMock: HttpTestingController, logoService: LogoService) => {
    logoService.getCompanyLogo('AAPL').subscribe(
      logo => expect(logo).toEqual(mockLogo)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/AAPL/logo');
    expect(req.request.method).toEqual('GET');

    req.flush(mockLogo);

    httpMock.verify();
  }));

  it('should handle null values', inject([HttpTestingController, LogoService],
      (httpMock: HttpTestingController, logoService: LogoService) => {
    mockLogo.url = null;

    logoService.getCompanyLogo('AAPL').subscribe(
      logo => expect(logo).toEqual(mockLogo)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/AAPL/logo');
    expect(req.request.method).toEqual('GET');

    req.flush(mockLogo);

    httpMock.verify();
  }));
});
