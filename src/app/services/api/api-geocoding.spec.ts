import { TestBed } from '@angular/core/testing';

import { ApiGeocoding } from './api-geocoding';

describe('ApiGeocoding', () => {
  let service: ApiGeocoding;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGeocoding);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
