import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environments';

export const baseUrlInterceptor: HttpInterceptorFn = (request, next) => {
  // External services already provide their complete URL.
  if (/^https?:\/\//i.test(request.url)) {
    return next(request);
  }

  const url = `${environment.apiUrl}${request.url.startsWith('/') ? request.url : `/${request.url}`}`;
  // HttpRequest instances are immutable, so clone before updating the URL.
  return next(request.clone({ url }));
};
