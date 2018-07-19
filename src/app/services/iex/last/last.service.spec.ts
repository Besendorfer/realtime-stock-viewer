import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LastService } from './last.service';

describe('LastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LastService]
    });
  });

  it('should be created', inject([LastService], (service: LastService) => {
    expect(service).toBeTruthy();
  }));
});
