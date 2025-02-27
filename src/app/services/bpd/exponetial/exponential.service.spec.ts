import { TestBed } from '@angular/core/testing';

import { ExponentialService } from './exponential.service';

describe('ExponentialService', () => {
  let service: ExponentialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExponentialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
