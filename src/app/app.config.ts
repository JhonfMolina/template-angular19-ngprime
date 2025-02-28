import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';
// import MyPreset from '../theme/mypresent';
import { CustomTitleStrategy } from './core/services/custom-title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        // preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
      ripple: true,
    }),
  ],
};
