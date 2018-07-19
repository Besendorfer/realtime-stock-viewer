import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LogoService } from './logo.service';

describe('LogoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogoService]
    });
  });

  it('should be created', inject([LogoService], (service: LogoService) => {
    expect(service).toBeTruthy();
  }));
});
