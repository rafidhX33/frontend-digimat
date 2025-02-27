import { TestBed } from '@angular/core/testing';

import { InspeksiService } from './inspeksi.service';

describe('InspeksiService', () => {
  let service: InspeksiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspeksiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
