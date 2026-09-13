import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import deLocale from '@angular/common/locales/de';
import { provideNativeDateAdapter } from '@angular/material/core';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';

registerLocaleData(deLocale);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([baseUrlInterceptor, httpErrorInterceptor])),
    provideNativeDateAdapter(),
  ],
};
