import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WeatherIconPipe } from '../../../../pipes/weather-icon-pipe';
import { Daily, Hourly, HourlyUnits } from '../../../../models/weather.model';
import { DatePipe, LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-hourly-forecast',
  imports: [MatFormFieldModule, MatSelectModule, WeatherIconPipe, DatePipe, LowerCasePipe],
  templateUrl: './hourly-forecast.html',
  styleUrl: './hourly-forecast.css',
})
export class HourlyForecast {
  readonly hourly = input.required<Hourly>();
  readonly hourlyUnit = input.required<HourlyUnits>();
  readonly sunrise = input.required<string[]>();
  readonly sunset = input.required<string[]>();
}
