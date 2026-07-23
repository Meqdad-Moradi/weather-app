import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForecast } from './daily-forecast';
import { mockWeatherData } from '../../../../models/weather-mock';

describe('DailyForecast', () => {
  let component: DailyForecast;
  let fixture: ComponentFixture<DailyForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyForecast],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyForecast);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('daily', mockWeatherData.daily);
    fixture.componentRef.setInput('dailyUnit', mockWeatherData.daily_units);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
