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
export class CourseTypeService {
  http: HttpClient = inject(HttpClient);
  toastService: ToastMessageService = inject(ToastMessageService);

  readonly courseTypes$ = new BehaviorSubject<CourseTypeDto[]>([]);

  getAllCourseTypes() {
    this.http
      .get<CourseTypeDto[]>(k9Config.apiRoot + '/course-types')
      .subscribe({
        next: (courseTypes) => {
          this.courseTypes$.next(courseTypes);
          console.log('courseTypes : ', courseTypes);
        },
        error: (error) => {
          console.error('Erreur fetching course types : ', error);
          this.toastService.show({
            severity: 'error',
            title: 'Récupération des types de cours',
            content:
              'Une erreur est survenue lors de la récupération des types de cours.',
            sticky: true,
          });
        },
      });
  }
}
