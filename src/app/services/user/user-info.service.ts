// ANGULAR
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, EMPTY } from 'rxjs';

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

  getUserInfo(): Observable<OwnerInfoDto> {
    return this.http.get<OwnerInfoDto>(`${k9Config.apiRoot}/user/me`).pipe(
      catchError((error) => {
        this.toastService.show({
          severity: 'error',
          title: 'Erreur de chargement',
          content: 'Impossible de récupérer vos informations utilisateur.',
          sticky: true,
        });

        console.error('ERROR API : ', error);

        return EMPTY;
      })
    );
  }
}
