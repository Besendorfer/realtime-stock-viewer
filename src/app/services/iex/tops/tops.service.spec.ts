import { TestBed, inject } from '@angular/core/testing';

import { TopsService } from './tops.service';

describe('TopsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopsService]
    });
  });

  it('should be created', inject([TopsService], (service: TopsService) => {
    expect(service).toBeTruthy();
  }));
});
