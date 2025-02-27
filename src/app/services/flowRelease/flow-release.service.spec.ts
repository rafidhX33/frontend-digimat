import { TestBed } from '@angular/core/testing';

import { FlowReleaseService } from './flow-release.service';

describe('FlowReleaseService', () => {
  let service: FlowReleaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowReleaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
