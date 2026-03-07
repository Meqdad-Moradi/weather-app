import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class ApiWeather {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private readonly searchUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  searchCity(query: string): Observable<any> {
    const params = {
      name: query,
      count: 5,
      language: 'en',
      format: 'json',
    };

    return this.http.get(this.searchUrl, { params });
  }

  getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.baseUrl, {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: 'true',
      },
    });
  }
}
