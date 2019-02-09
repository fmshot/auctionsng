import { TestBed } from '@angular/core/testing';

import { NavbarandfooterService } from './navbarandfooter.service';

describe('NavbarandfooterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarandfooterService = TestBed.get(NavbarandfooterService);
    expect(service).toBeTruthy();
  });
});
