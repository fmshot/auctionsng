import { TestBed } from '@angular/core/testing';

import { AuctionuserService } from './auctionuser.service';

describe('AuctionuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuctionuserService = TestBed.get(AuctionuserService);
    expect(service).toBeTruthy();
  });
});
