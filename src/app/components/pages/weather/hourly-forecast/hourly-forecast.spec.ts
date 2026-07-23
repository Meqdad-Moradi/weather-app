import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForecast } from './hourly-forecast';
import { mockWeatherData } from '../../../../models/weather-mock';

describe('HourlyForecast', () => {
  let component: HourlyForecast;
  let fixture: ComponentFixture<HourlyForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyForecast],
    }).compileComponents();

    fixture = TestBed.createComponent(HourlyForecast);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hourly', mockWeatherData.hourly);
    fixture.componentRef.setInput('hourlyUnit', mockWeatherData.hourly_units);
    fixture.componentRef.setInput('sunrise', mockWeatherData.daily.sunrise);
    fixture.componentRef.setInput('sunset', mockWeatherData.daily.sunset);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
