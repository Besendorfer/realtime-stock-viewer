import { TestBed, inject } from '@angular/core/testing';

import { IexService } from './iex.service';

describe('IexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IexService]
    });
  });

  it('should be created', inject([IexService], (service: IexService) => {
    expect(service).toBeTruthy();
  }));
});
