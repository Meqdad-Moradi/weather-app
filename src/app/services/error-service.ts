import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ErrorDialog } from '../components/apps/dialogs/error-dialog/error-dialog';

interface ErrorAction<T> {
  logError?: boolean;
  showErrorInDialog?: boolean;
  valueToReturn?: T;
}

export class ErrorResponse<T> {
  constructor(
    public status: number,
    public value: T | string,
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly dialog = inject(MatDialog);

  // Converts an unknown error into a friendly message for the user.
  public getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
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

    // Fallback for non-HttpErrorResponse objects that still carry a server message.
    const fallbackMessage =
      (error as { error?: { error?: { message?: string }; message?: string } })?.error?.error
        ?.message ||
      (error as { error?: { message?: string } })?.error?.message ||
      (error as { message?: string })?.message;

    return fallbackMessage || 'Server not available. Please try again later!';
  }

  // Opens the reusable Material dialog shown to users when a request fails.
  public showErrorDialog(message: string, title = 'Request failed'): void {
    this.dialog.open(ErrorDialog, {
      data: { title, message },
      disableClose: false,
    });
  }

  /**
   * Creates a catchError handler for service methods.
   * It turns the raw error into a consistent ErrorResponse and optionally shows a dialog.
   * @returns Observable<ErrorResponse<T>>
   */
  public handleError<T>(
    operation: string,
    errorAction: ErrorAction<T> = { logError: true },
  ): (error: any) => Observable<ErrorResponse<T>> {
    return (error: any): Observable<ErrorResponse<T>> => {
      const errorMessage = this.getErrorMessage(error);

      if (errorAction.showErrorInDialog) {
        this.showErrorDialog(errorMessage);
      }

      return of(new ErrorResponse<T>(error?.status ?? 500, errorMessage));
    };
  }
}
