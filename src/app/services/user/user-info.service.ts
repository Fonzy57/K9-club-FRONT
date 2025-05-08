// ANGULAR
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, EMPTY } from 'rxjs';

// CONFIG
import { apiRoot } from '@config/api/api';
import { ToastMessageService } from '@services/toast/toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  http: HttpClient = inject(HttpClient);
  toastService: ToastMessageService = inject(ToastMessageService);

  getUserInfo(): Observable<UserInfoDto> {
    return this.http.get<UserInfoDto>(`${apiRoot}/user/me`).pipe(
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
