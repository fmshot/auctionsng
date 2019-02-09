import { TestBed } from '@angular/core/testing';

import { CurrentonlineuserService } from './currentonlineuser.service';

describe('CurrentuseronlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentonlineuserService = TestBed.get(CurrentonlineuserService);
    expect(service).toBeTruthy();
  });
});
