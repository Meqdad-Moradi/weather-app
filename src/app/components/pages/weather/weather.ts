import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
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
import { startWith } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DisplayWeather } from './display-weather/display-weather';

@Component({
  selector: 'app-weather',
  imports: [
    MainTitle,
    FormsModule,
    ReactiveFormsModule,
    DisplayWeather,
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
  private readonly destroyRef = inject(DestroyRef);

  public results = signal<GeoResult[]>([]);
  public selectedCity = signal<GeoResult | null>(null);
  public weather = signal<WeatherResponse | null>(null);
  public isLoading = signal(false);
  public isWeatherLoading = signal(false);
  public searchControl = new FormControl<GeoResult | string>('');

  private controlValueChanges = toSignal(this.searchControl.valueChanges.pipe(startWith('')), {
    initialValue: '',
  });

  /**
   * computed signals
   * filteredResult
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
  searchPlace(e: Event): void {
    e.preventDefault();
    e.stopPropagation();

    if (!this.searchControl.value || typeof this.searchControl.value !== 'string') return;
    const q = this.searchControl.value?.trim();

    this.isLoading.set(true);

    this.apiGeoService
      .searchCity(q)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.isLoading.set(false);
        this.results.set(res.results || []);
      });
  }

  /**
   * chooseCity
   * by choosing a city, tempreature for the choosen city will be searched
   * @returns void
   */
  public chooseCity(): void {
    if (typeof this.searchControl.value === 'string') return;
    const city = this.searchControl.value!;

    this.isWeatherLoading.set(true);
    this.selectedCity.set(city);

    this.apiWeatherService
      .getWeather(city.latitude, city.longitude)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.isWeatherLoading.set(false);
        this.weather.set(data);
        console.log(data);
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

  /**
   * resetControl
   */
  public resetControl(): void {
    this.searchControl.reset();
  }
}
