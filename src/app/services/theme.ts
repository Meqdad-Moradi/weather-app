import { computed, effect, Injectable, signal } from '@angular/core';
import { TTheme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly storeKey = 'weather-theme';

  private systemTheme = computed(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  private storedTheme = computed(() => JSON.parse(localStorage.getItem(this.storeKey)!) as TTheme);

  private currentTheme = signal<TTheme>(
    this.storedTheme() ? this.storedTheme() : this.systemTheme(),
  );

  public theme = computed(() => this.currentTheme());

  constructor() {
    effect(() => {
      const current = this.currentTheme();
      document.documentElement.setAttribute('data-theme', current);
      localStorage.setItem(this.storeKey, JSON.stringify(current));
    });
  }

  toggleTheme(): void {
    this.currentTheme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }
}
