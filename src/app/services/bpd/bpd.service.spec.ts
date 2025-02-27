import { TestBed } from '@angular/core/testing';

import { BpdService } from './bpd.service';

describe('BpdService', () => {
  let service: BpdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
