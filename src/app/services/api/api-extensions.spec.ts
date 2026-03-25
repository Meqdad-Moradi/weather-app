import { TestBed } from '@angular/core/testing';

import { ApiExtensions } from './api-extensions';

describe('ApiExtensions', () => {
  let service: ApiExtensions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExtensions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
