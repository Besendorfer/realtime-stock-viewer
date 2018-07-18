import { TestBed, inject } from '@angular/core/testing';

import { RefDataService } from './ref-data.service';

describe('RefDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefDataService]
    });
  });

  it('should be created', inject([RefDataService], (service: RefDataService) => {
    expect(service).toBeTruthy();
  }));
});
