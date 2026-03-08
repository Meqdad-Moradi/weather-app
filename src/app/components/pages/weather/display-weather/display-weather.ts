import { Component, input } from '@angular/core';
import { WeatherResponse } from '../../../../models/weather.model';
import { GeoResult } from '../../../../models/geocoding.model';
import { DatePipe } from '@angular/common';
import { WeatherIconPipe } from '../../../../pipes/weather-icon-pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-display-weather',
  imports: [DatePipe, WeatherIconPipe,MatProgressSpinnerModule],
  templateUrl: './display-weather.html',
  styleUrl: './display-weather.css',
})
export class DisplayWeather {
  readonly weather = input.required<WeatherResponse>();
  readonly selectedCity = input.required<GeoResult>();
  readonly isWeatherLoading = input.required<boolean>();
}
