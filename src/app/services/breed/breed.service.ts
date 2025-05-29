// ANGULAR
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// SERVICES
import { ToastMessageService } from '@services/toast/toast-message.service';

// CONFIG
import { k9Config } from '@config/global';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  http: HttpClient = inject(HttpClient);
  toastService: ToastMessageService = inject(ToastMessageService);

  readonly breeds$ = new BehaviorSubject<BreedDto[]>([]);

  getAllBreeds() {
    this.http.get<BreedDto[]>(k9Config.apiRoot + '/breeds').subscribe({
      next: (breeds) => {
        this.breeds$.next(breeds);
        console.log('BREEDS : ', breeds);
      },
      error: (error) => {
        console.error('Erreur fetching breeds : ', error);
        this.toastService.show({
          severity: 'error',
          title: 'Récupération des races',
          content: 'Une erreur est survenue lors de la récupération des races.',
          sticky: true,
        });
      },
    });
  }
}
