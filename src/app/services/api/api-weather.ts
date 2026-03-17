import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from '../../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class ApiWeather {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private readonly searchUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  /**
   * searchCity
   * @param query string
   * @returns Observable<any>
   */
  public searchCity(query: string): Observable<any> {
    const params = {
      name: query,
      count: 5,
      language: 'en',
      format: 'json',
    };

    return this.http.get(this.searchUrl, { params });
  }

  /**
   * getWeather
   * @param params
   * @returns Observable<IWeather>
   */
  public getWeather(params: any): Observable<IWeather> {
    return this.http.get<IWeather>(this.baseUrl, { params });
  }
}
