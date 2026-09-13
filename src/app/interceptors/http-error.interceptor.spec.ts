import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, throwError } from 'rxjs';
import { httpErrorInterceptor } from './http-error.interceptor';

describe('httpErrorInterceptor', () => {
  it('reports HTTP errors and rethrows the original error', async () => {
    const errorHandler = { handleError: vi.fn() };
    const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
    const request = new HttpRequest('GET', '/missing');
    const next: HttpHandlerFn = () => throwError(() => error);

    TestBed.configureTestingModule({
      providers: [{ provide: ErrorHandler, useValue: errorHandler }],
    });

    await expect(
      firstValueFrom(TestBed.runInInjectionContext(() => httpErrorInterceptor(request, next))),
    ).rejects.toBe(error);

    expect(errorHandler.handleError).toHaveBeenCalledOnce();
    expect(errorHandler.handleError.mock.calls[0][0].message).toBe(
      'The requested resource could not be found.',
    );
  });
});
