import { ErrorHandler, inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorHandler = inject(ErrorHandler);

  return next(request).pipe(
    catchError((error: unknown) => {
      // Report a useful message globally, then preserve the original error for callers.
      if (error instanceof HttpErrorResponse) {
        const message = getErrorMessage(error);
        errorHandler.handleError(new Error(message, { cause: error }));
      } else {
        errorHandler.handleError(error);
      }

      return throwError(() => error);
    }),
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 0:
      return 'Unable to connect to the server. Please check your connection and try again.';
    case 401:
      return 'Your session has expired. Please sign in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource could not be found.';
    case 500:
      return 'The server encountered an error. Please try again later.';
    default:
      return error.message || 'An unexpected request error occurred.';
  }
}
