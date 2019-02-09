import { TestBed } from '@angular/core/testing';

import { AucttimeService } from './aucttime.service';

describe('AucttimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AucttimeService = TestBed.get(AucttimeService);
    expect(service).toBeTruthy();
  });
});
