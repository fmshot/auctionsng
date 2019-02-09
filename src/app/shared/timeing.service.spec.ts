import { TestBed } from '@angular/core/testing';

import { TimeingService } from './timeing.service';

describe('TimeingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeingService = TestBed.get(TimeingService);
    expect(service).toBeTruthy();
  });
});
