import { TestBed } from '@angular/core/testing';

import { AdminproductService } from './adminproduct.service';

describe('AdminproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminproductService = TestBed.get(AdminproductService);
    expect(service).toBeTruthy();
  });
});
