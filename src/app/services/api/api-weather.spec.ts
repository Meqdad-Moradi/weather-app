import { TestBed } from '@angular/core/testing';

import { ApiWeather } from './api-weather';

describe('ApiWeather', () => {
  let service: ApiWeather;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWeather);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
