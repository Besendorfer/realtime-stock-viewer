import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RefDataService } from './ref-data.service';

// interfaces
import { RefData }  from '../interfaces/ref-data';

describe('RefDataService', () => {
  let mockRefData: RefData[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RefDataService]
    });

    mockRefData = [
      {
        "symbol": "A",
        "name": "AGILENT TECHNOLOGIES INC",
        "date": "2017-04-19",
        "isEnabled": true
      },
      {
        "symbol": "AA",
        "name": "ALCOA CORP",
        "date": "2017-04-19",
        "isEnabled": true
      }
    ]
  });

  it('should be created', inject([RefDataService], (service: RefDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the expected symbols ref-data', inject([HttpTestingController, RefDataService],
      (httpMock: HttpTestingController, refDataService: RefDataService) => {
    refDataService.getRefData().subscribe(
      refData => expect(refData).toEqual(mockRefData)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/ref-data/symbols');
    expect(req.request.method).toEqual('GET');

    req.flush(mockRefData);

    httpMock.verify();
  }));

  it('should handle null values', inject([HttpTestingController, RefDataService],
      (httpMock: HttpTestingController, refDataService: RefDataService) => {
    mockRefData[0].symbol = null;
    mockRefData[0].isEnabled = null;

    refDataService.getRefData().subscribe(
      refData => expect(refData).toEqual(mockRefData)
    );

    const req = httpMock.expectOne('https://api.iextrading.com/1.0/ref-data/symbols');
    expect(req.request.method).toEqual('GET');

    req.flush(mockRefData);

    httpMock.verify();
  }));
});
