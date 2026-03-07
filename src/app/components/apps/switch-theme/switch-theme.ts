import { Component, inject, OnInit } from '@angular/core';
import { Theme } from '../../../services/theme';
import { ApiWeather } from '../../../services/api/api-weather';

@Component({
  selector: 'app-switch-theme',
  imports: [],
  templateUrl: './switch-theme.html',
  styleUrl: './switch-theme.css',
})
export class SwitchTheme implements OnInit {
  private readonly themeService = inject(Theme);
  private readonly apiWeatherService = inject(ApiWeather);

  public theme = this.themeService.theme;

  ngOnInit(): void {
    this.apiWeatherService.searchCity('wien').subscribe(console.log);
    // this.apiWeatherService.getWeather().subscribe(console.log)
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
