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
export class CoursesService {
  http: HttpClient = inject(HttpClient);
  toastService: ToastMessageService = inject(ToastMessageService);

  readonly courses$ = new BehaviorSubject<CourseDto[]>([]);

  getAllCourse() {
    this.http.get<CourseDto[]>(k9Config.apiRoot + '/courses').subscribe({
      next: (courses) => {
        this.courses$.next(courses);
      },
      error: (error) => {
        console.error('Erreur fetching course : ', error);
        this.toastService.show({
          severity: 'error',
          title: 'Récupération des cours',
          content: 'Une erreur est survenue lors de la récupération des cours.',
          sticky: true,
        });
      },
    });
  }
}
