import { ErrorHandler, inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error-service';

// Global HTTP error handler. It logs and normalizes the message, but does not open UI dialogs itself.
export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errorHandler = inject(ErrorHandler);
  const errorService = inject(ErrorService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const message = errorService.getErrorMessage(error);
        errorHandler.handleError(new Error(message, { cause: error }));
      } else {
        errorHandler.handleError(error);
      }

      // Re-throw so the service-level catchError can decide whether to show a dialog or handle the error.
      return throwError(() => error);
    }),
  );
};
