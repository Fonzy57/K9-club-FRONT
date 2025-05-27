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
export class UserInfoService {
  http: HttpClient = inject(HttpClient);
  toastService: ToastMessageService = inject(ToastMessageService);

  readonly user$ = new BehaviorSubject<any>({});

  getUserInfos() {
    this.http.get(k9Config.apiRoot + '/user/me').subscribe({
      next: (user) => {
        this.user$.next(user);
      },
      error: (error) => {
        console.error("Erreur fetching owner's informations : ", error);
        this.toastService.show({
          severity: 'error',
          title: 'Récupération des informations',
          content:
            'Une erreur est survenue lors de la récupération de vos informations.',
          sticky: true,
        });
      },
    });
  }

  /* TODO AJOUTER LES AUTRES PARTIES DU CRUD */
}
