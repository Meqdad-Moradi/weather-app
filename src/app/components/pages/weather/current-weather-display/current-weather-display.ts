import { Component, input } from '@angular/core';
import { IWeather } from '../../../../models/weather.model';
import { GeoResult } from '../../../../models/geocoding.model';
import { DatePipe } from '@angular/common';
import { WeatherIconPipe } from '../../../../pipes/weather-icon-pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-current-weather-display',
  imports: [DatePipe, WeatherIconPipe, MatProgressSpinnerModule],
  templateUrl: './current-weather-display.html',
  styleUrl: './current-weather-display.css',
})
export class CurrentWeatherDisplay {
  readonly weather = input.required<IWeather>();
  readonly selectedCity = input.required<GeoResult>();
  readonly isWeatherLoading = input.required<boolean>();
}
