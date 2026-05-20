import { TestBed } from '@angular/core/testing';

import { ApiVirtualScroll } from './api-virtual-scroll';

describe('ApiVirtualScroll', () => {
  let service: ApiVirtualScroll;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVirtualScroll);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
