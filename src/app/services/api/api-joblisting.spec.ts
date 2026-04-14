import { TestBed } from '@angular/core/testing';

import { ApiJoblisting } from './api-joblisting';

describe('ApiJoblisting', () => {
  let service: ApiJoblisting;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiJoblisting);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
