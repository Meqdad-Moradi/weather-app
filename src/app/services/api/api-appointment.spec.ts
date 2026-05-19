import { TestBed } from '@angular/core/testing';

import { ApiAppointment } from './api-appointment';

describe('ApiAppointment', () => {
  let service: ApiAppointment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAppointment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
