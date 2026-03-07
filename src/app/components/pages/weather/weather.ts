import { Component, inject, signal } from '@angular/core';
import { GeoResult } from '../../../models/geocoding.model';
import { WeatherResponse } from '../../../models/weather.model';
import { ApiGeocoding } from '../../../services/api/api-geocoding';
import { ApiWeather } from '../../../services/api/api-weather';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  query = signal('');
  results = signal<GeoResult[]>([]);
  selectedCity = signal<GeoResult | null>(null);
  weather = signal<WeatherResponse | null>(null);
  loading = signal(false);

  private readonly geo = inject(ApiGeocoding);
  private readonly weatherService = inject(ApiWeather);

  search() {
    const q = this.query().trim();
    if (!q) return;

    this.loading.set(true);
    this.weather.set(null);

    this.geo.searchCity(q).subscribe((res) => {
      this.results.set(res.results || []);
      this.loading.set(false);
    });
  }

  chooseCity(city: GeoResult) {
    this.selectedCity.set(city);
    this.results.set([]);
    this.query.set('');
    this.loading.set(true);

    this.weatherService.getWeather(city.latitude, city.longitude).subscribe((data) => {
      this.weather.set(data);
      this.loading.set(false);
    });
  }
}
