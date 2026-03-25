import { Component, computed, input } from '@angular/core';
import { IWeather } from '../../../../models/weather.model';
import { GeoResult } from '../../../../models/geocoding.model';
import { DatePipe } from '@angular/common';
import { WeatherIconPipe } from '../../../../pipes/weather-icon-pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrentWeatherDetails } from '../current-weather-details/current-weather-details';
import { HourlyForecast } from "../hourly-forecast/hourly-forecast";
import { DailyForecast } from "../daily-forecast/daily-forecast";

@Component({
  selector: 'app-current-weather-display',
  imports: [DatePipe, WeatherIconPipe, MatProgressSpinnerModule, CurrentWeatherDetails, HourlyForecast, DailyForecast],
  templateUrl: './current-weather-display.html',
  styleUrl: './current-weather-display.css',
})
export class CurrentWeatherDisplay {
  readonly weather = input.required<IWeather>();
  readonly selectedCity = input.required<GeoResult>();
  readonly isWeatherLoading = input.required<boolean>();

  /**
   * computed signals
   */
  public feelsLike = computed(() => {
    // const now = this.weather()?.hourly.time[0];
    const temperature = this.weather()?.hourly.apparent_temperature[0];
    const unit = this.weather()?.hourly_units.apparent_temperature[0];
    return `${temperature}${unit}`;
  });
  public wind = computed(() => {
    const windspeed = this.weather()?.current_weather.windspeed;
    const unit = this.weather()?.current_weather_units.windspeed;
    return `${windspeed} ${unit}`;
  });
  public humidity = computed(() => {
    const hm = this.weather()?.hourly.relative_humidity_2m[0];
    const unit = this.weather()?.hourly_units.relative_humidity_2m[0];
    return `${hm}${unit}`;
  });
  public precipitation = computed(() => {
    const pr = this.weather()?.hourly.precipitation[0];
    const unit = this.weather()?.hourly_units.apparent_temperature[0];
    return `${pr} ${unit}`;
  });
}
