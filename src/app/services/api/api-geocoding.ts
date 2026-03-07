import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeoResponse } from '../../models/geocoding.model';

@Injectable({
  providedIn: 'root',
})
export class ApiGeocoding {
  private readonly http = inject(HttpClient);

  private url = 'https://geocoding-api.open-meteo.com/v1/search';

  searchCity(query: string): Observable<GeoResponse> {
    return this.http.get<GeoResponse>(this.url, {
      params: {
        name: query,
        count: 5,
        language: 'en',
        format: 'json',
      },
    });
  }
}
