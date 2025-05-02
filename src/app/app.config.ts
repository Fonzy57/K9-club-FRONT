// ANGULAR
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

// ROUTING
import { routes } from './app.routes';

// PRIME NG
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),

    // TODO SI LIBRAIRIE POSE PROBLEME SUPPRIMER CE QU'IL Y A EN DESSOUS
    // VOIR POUR FAIRE LE DARK MODE
    // https://primeng.org/theming
    importProvidersFrom(BrowserAnimationsModule),
    MessageService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'my',
          darkModeSelector: false || 'none',
        },
      },
    }),
  ],
};
