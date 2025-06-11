// ANGULAR
import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

// INTERCEPTORS
import { jwtInterceptor } from "./interceptor/jwt.interceptor";

// ROUTING
import { routes } from "./app.routes";

// PRIME NG
import { providePrimeNG } from "primeng/config";
import { MessageService } from "primeng/api";
import { MyPreset } from "@config/my-theme";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: "fr-FR" },

    // TODO SI LIBRAIRIE POSE PROBLEME SUPPRIMER CE QU'IL Y A EN DESSOUS
    // VOIR POUR FAIRE LE DARK MODE
    // https://primeng.org/theming
    importProvidersFrom(BrowserAnimationsModule),
    MessageService,
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          prefix: "my",
          darkModeSelector: false || "none",
        },
      },
      translation: {
        dayNames: [
          "Dimanche",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
        ],
        dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
        monthNames: [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ],
        monthNamesShort: [
          "Jan",
          "Fév",
          "Mar",
          "Avr",
          "Mai",
          "Jun",
          "Jul",
          "Aoû",
          "Sep",
          "Oct",
          "Nov",
          "Déc",
        ],
        today: "Aujourd'hui",
        clear: "Effacer",
        weekHeader: "Sem",
        firstDayOfWeek: 1, // Lundi = 1, Dimanche = 0
      },
    }),
  ],
};
