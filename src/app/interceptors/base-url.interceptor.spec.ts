import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { baseUrlInterceptor } from './base-url.interceptor';

describe('baseUrlInterceptor', () => {
  it('adds the configured base URL to relative requests', async () => {
    const request = new HttpRequest('GET', '/todos');
    let forwardedRequest: HttpRequest<unknown> | undefined;
    const next: HttpHandlerFn = (forwarded) => {
      forwardedRequest = forwarded;
      return of({});
    };

    await firstValueFrom(baseUrlInterceptor(request, next));

    expect(forwardedRequest?.url).toBe('http://localhost:3000/todos');
  });

  it('leaves absolute requests unchanged', async () => {
    const request = new HttpRequest('GET', 'https://api.open-meteo.com/v1/forecast');
    let forwardedRequest: HttpRequest<unknown> | undefined;
    const next: HttpHandlerFn = (forwarded) => {
      forwardedRequest = forwarded;
      return of({});
    };

    await firstValueFrom(baseUrlInterceptor(request, next));

    expect(forwardedRequest?.url).toBe(request.url);
  });
});
