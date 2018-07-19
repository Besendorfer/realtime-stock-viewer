import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HttpErrorResponse } from '@angular/common/http';

// services
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
    const mockPrice: Number = 105.28;

    priceService.getStockPrice('MSFT').subscribe(
      price => expect(price).toEqual(mockPrice)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/MSFT/price');
    expect(req.request.method).toEqual('GET');

    req.flush(mockPrice);

    httpMock.verify();
  }));

  /**
   * This is a good case for when the Observable throws an error. If I decide to throw a 404, I'll use this test case.
   */
  // it('should throw an error when data isn\'t found', inject([HttpTestingController, PriceService],
  //     (httpMock: HttpTestingController, priceService: PriceService) => {
  //   const errorMessage = '404\'d!';

  //   priceService.getStockPrice('MSFT').subscribe(
  //     price => fail('should fail with 404'),
  //     (error: HttpErrorResponse) => {
  //       expect(error.status).toEqual(404, 'status');
  //       expect(error.error).toEqual(errorMessage, 'message');
  //     }
  //   );

  //   const req = httpMock.expectOne('https://api.iextrading.com/1.0/stock/MSFT/price');

  //   req.flush(errorMessage, { status: 404, statusText: 'Not Found' });

  //   httpMock.verify();
  // }));
});
