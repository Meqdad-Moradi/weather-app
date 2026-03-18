import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon',
})
export class WeatherIconPipe implements PipeTransform {
  transform(code: number, time: string, sunrise: string, sunset: string): string {
    const isNight = this.isNightTime(time, sunrise, sunset);

    const dayIcons: Record<number, string> = {
      0: '☀️', // Clear
      1: '🌤️', // Mostly clear
      2: '⛅', // Partly cloudy
      3: '☁️', // Overcast

      45: '🌫️', // Fog
      48: '🌫️',

      51: '🌦️', // Drizzle
      53: '🌦️',
      55: '🌧️',

      61: '🌧️', // Rain
      63: '🌧️',
      65: '🌧️',

      66: '🌧️❄️', // Freezing rain
      67: '🌧️❄️',

      71: '🌨️', // Snow
      73: '🌨️',
      75: '❄️',
      77: '❄️',

      80: '🌦️', // Showers
      81: '🌧️',
      82: '🌧️',

      95: '⛈️', // Thunderstorm
      96: '⛈️',
      99: '⛈️',
    };

    const nightIcons: Record<number, string> = {
      0: '🌙', // Clear night
      1: '🌙', // Mostly clear night
      2: '🌙☁️', // Partly cloudy night
      3: '☁️', // Overcast (same)

      45: '🌫️',
      48: '🌫️',

      51: '🌧️',
      53: '🌧️',
      55: '🌧️',

      61: '🌧️',
      63: '🌧️',
      65: '🌧️',

      66: '🌧️❄️',
      67: '🌧️❄️',

      71: '🌨️',
      73: '🌨️',
      75: '❄️',
      77: '❄️',

      80: '🌧️',
      81: '🌧️',
      82: '🌧️',

      95: '⛈️',
      96: '⛈️',
      99: '⛈️',
    };

    return isNight ? (nightIcons[code] ?? '❔') : (dayIcons[code] ?? '❔');
  }

  /**
   * isNightTime
   * @param time string - date and time
   * @param sunrise string - date and time
   * @param sunset string - date and time
   * @returns boolean - is night time or not
   */
  private isNightTime(time: string, sunrise: string, sunset: string): boolean {
    const t = new Date(time).getTime();
    const sr = new Date(sunrise).getTime();
    const ss = new Date(sunset).getTime();
    return t < sr || t >= ss;
  }
}
