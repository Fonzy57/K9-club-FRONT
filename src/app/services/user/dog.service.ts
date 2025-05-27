// ANGULAR
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { k9Config } from '@config/global';

// TYPES

// SERVICES
import { ToastMessageService } from '@services/toast/toast-message.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  http: HttpClient = inject(HttpClient);
  toastService: ToastMessageService = inject(ToastMessageService);

  readonly dogs$ = new BehaviorSubject<any[]>([]);

  getAllDogs() {
    this.http.get<any[]>(k9Config.apiRoot + '/owner/dogs').subscribe({
      next: (dogs) => {
        this.dogs$.next(dogs);
      },
      error: (error) => {
        console.error("Erreur fetching owner's dogs", error);
        this.toastService.show({
          severity: 'error',
          title: 'Récupération des chiens',
          content:
            'Une erreur est survenue lors de la récupération des informations de vos chiens.',
          sticky: true,
        });
      },
    });
  }

  /* TODO AJOUTER LES AUTRES PARTIES DU CRUD */
}
