import { Component, computed, input } from '@angular/core';
import { Daily, DailyUnits } from '../../../../models/weather.model';
import { WeatherIconPipe } from '../../../../pipes/weather-icon-pipe';
import { WeekDayPipe } from '../../../../pipes/week-day-pipe';

@Component({
  selector: 'app-daily-forecast',
  imports: [WeatherIconPipe, WeekDayPipe],
  templateUrl: './daily-forecast.html',
  styleUrl: './daily-forecast.css',
})
export class DailyForecast {
  readonly daily = input.required<Daily>();
  readonly dailyUnit = input.required<DailyUnits>();
}
