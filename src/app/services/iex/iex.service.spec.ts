import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IexService } from './iex.service';

describe('IexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IexService]
    });
  });

  it('should be created', inject([IexService], (service: IexService) => {
    expect(service).toBeTruthy();
  }));
});
