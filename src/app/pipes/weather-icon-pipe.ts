import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon',
})
export class WeatherIconPipe implements PipeTransform {
  transform(code: number, ...args: unknown[]): string {
    // WMO Weather interpretation codes (WW)
    const iconMap: { [key: number]: string } = {
      0: 'assets/images/icon-sunny.webp', // Clear sky
      1: 'assets/images/icon-partly-cloudy.webp', // Mainly clear
      2: 'assets/images/icon-partly-cloudy.webp', // Partly cloudy
      3: 'assets/images/icon-overcast.webp', // Overcast
      45: 'assets/images/icon-fog.webp', // Fog
      48: 'assets/images/icon-fog.webp', // Depositing rime fog
      51: 'assets/images/icon-drizzle.webp', // Drizzle: Light
      61: 'assets/images/icon-rain.webp', // Rain: Slight
      71: 'assets/images/icon-snow.webp', // Snow fall: Slight
      80: 'assets/images/icon-rain.webp', // Rain showers: Slight
      95: 'assets/images/icon-storm.webp', // Thunderstorm: Slight or moderate
    };

    // Returns the icon class or a default cloud if code is unknown
    return iconMap[code] || '';
  }
}
