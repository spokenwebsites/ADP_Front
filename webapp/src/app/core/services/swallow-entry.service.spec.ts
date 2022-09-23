import { TestBed } from '@angular/core/testing';

import { SwallowEntryService } from './swallow-entry.service';

describe('SwallowEntryService', () => {
  let service: SwallowEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwallowEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
