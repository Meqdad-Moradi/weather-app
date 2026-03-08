import { Component, computed, effect, inject, signal } from '@angular/core';
import { GeoResult } from '../../../models/geocoding.model';
import { WeatherResponse } from '../../../models/weather.model';
import { ApiGeocoding } from '../../../services/api/api-geocoding';
import { ApiWeather } from '../../../services/api/api-weather';
import { MainTitle } from '../../apps/main-title/main-title';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, startWith } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-weather',
  imports: [
    MainTitle,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  private readonly apiGeoService = inject(ApiGeocoding);
  private readonly apiWeatherService = inject(ApiWeather);

  public results = signal<GeoResult[]>([]);
  public weather = signal<WeatherResponse | null>(null);
  public isLoading = signal(false);
  public searchControl = new FormControl<GeoResult | string>('');

  private controlValueChanges = toSignal(this.searchControl.valueChanges.pipe(startWith('')), {
    initialValue: '',
  });

  /**
   * computed signals
   */
  public filteredResult = computed(() => {
    const currentValue = this.controlValueChanges();

    if (typeof currentValue === 'string') {
      let values: string[] = currentValue.split(' ');

      return this.results().filter((r) =>
        values.every(
          (x) =>
            r.name.toLocaleLowerCase().includes(x.toLocaleLowerCase()) ||
            r.country.toLocaleLowerCase().includes(x),
        ),
      );
    } else {
      return [];
    }
  });

  /**
   * searchPlace
   * @returns void
   */
  searchPlace(): void {
    if (!this.searchControl.value || typeof this.searchControl.value !== 'string') return;
    const q = this.searchControl.value?.trim();

    this.isLoading.set(true);
    this.weather.set(null);

    this.apiGeoService.searchCity(q).subscribe((res) => {
      this.isLoading.set(false);
      this.results.set(res.results || []);
    });
  }

  /**
   * chooseCity
   * @returns void
   */
  public chooseCity(): void {
    if (typeof this.searchControl.value === 'string') return;
    const city = this.searchControl.value!;

    this.isLoading.set(true);

    this.apiWeatherService.getWeather(city.latitude, city.longitude).subscribe((data) => {
      this.isLoading.set(false);
      this.weather.set(data);
    });

    // don't show anything in the input box
    this.searchControl.reset();
  }

  /**
   * displayFn
   * display selected place or city
   * @param value
   * @returns
   */
  public displayFn(value: GeoResult): string {
    return value && value.name ? value.name : '';
  }

  public resetControl(): void {
    this.searchControl.reset();
  }
}
