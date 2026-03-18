import { Component, input } from '@angular/core';

@Component({
  selector: 'app-current-weather-details',
  imports: [],
  templateUrl: './current-weather-details.html',
  styleUrl: './current-weather-details.css',
})
export class CurrentWeatherDetails {
  readonly title = input.required<string>();
  readonly value = input.required<string>();
}
