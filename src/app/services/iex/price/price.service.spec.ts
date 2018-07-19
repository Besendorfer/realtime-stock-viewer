import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PriceService } from './price.service';

describe('PriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PriceService]
    });
  });

  it('should be created', inject([PriceService], (service: PriceService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected price for MSFT', inject([HttpTestingController, PriceService],
      (httpMock: HttpTestingController, priceService: PriceService) => {
    const mockPrice = 105.28;

    priceService.getStockPrice('MSFT').subscribe(
      price => expect(price).toEqual(mockPrice)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/MSFT/price');
    expect(req.request.method).toEqual('GET');

    req.flush(mockPrice);

    httpMock.verify();
  }));
});
