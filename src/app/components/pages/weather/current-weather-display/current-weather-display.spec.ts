import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherDisplay } from './current-weather-display';
import { mockWeatherData } from '../../../../models/weather-mock';

describe('CurrentWeatherDisplay', () => {
  let component: CurrentWeatherDisplay;
  let fixture: ComponentFixture<CurrentWeatherDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeatherDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherDisplay);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('weather', mockWeatherData);
    fixture.componentRef.setInput('selectedCity', {});
    fixture.componentRef.setInput('isWeatherLoading', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
