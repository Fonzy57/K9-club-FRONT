// ANGULAR
import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

// PRIME NG
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialog } from 'primeng/confirmdialog';

// CONFIG
import { AppRoutes } from '@config/routes';
import { apiRoot } from '@config/api/api';

// SERVICES
import { ToastMessageService } from '@services/toast/toast-message.service';

@Component({
  selector: 'app-admin-coaches',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    ToastModule,
    TableModule,
    ButtonComponent,
    DatePipe,
    UpperCasePipe,
    CustomIconComponent,
    ConfirmDialog,
    RouterLink,
  ],
  templateUrl: './admin-coaches.component.html',
  providers: [ConfirmationService],
})
export class AdminCoachesComponent implements OnInit {
  AppRoutes = AppRoutes;
  toastService: ToastMessageService = inject(ToastMessageService);
  http: HttpClient = inject(HttpClient);

  coaches: CoachAdmin[] = [];

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.http.get<CoachAdmin[]>(apiRoot + '/coaches').subscribe({
      next: (coaches) => {
        this.coaches = coaches;
      },
      // TODO VOIR LA GESTION DES ERREURS : https://paul-chesa.medium.com/handling-errors-from-http-calls-in-angular-4dbc7f6b26ca
      error: (error) => {
        this.toastService.show({
          severity: 'error',
          title: 'Erreur de chargement',
          content: 'Impossible de récupérer la liste des coachs.',
          sticky: true,
        });
        console.error('ERREUR API : ', error);
      },
    });
  }

  onConfirmDelete(coach: CoachAdmin) {
    this.confirmationService.confirm({
      header: "Suppression d'un compte",
      message: `${coach.firstname} ${coach.lastname.toUpperCase()}`,
      accept: () => {
        // DELETING THE COACH
        this.onDeleteCoach(coach);
      },
      reject: () => {
        this.toastService.show({
          severity: 'info',
          title: 'Suppression annulée',
          content: `Le compte du coach ${
            coach.firstname
          } ${coach.lastname.toUpperCase()} n'a pas été supprimé.`,
          time: 4000,
        });
      },
    });
  }

  onDeleteCoach(coach: CoachAdmin) {
    this.http.delete<CoachAdmin>(`${apiRoot}/coach/${coach.id}`).subscribe({
      next: () => {
        this.coaches = this.coaches.filter((c) => c.id !== coach.id);

        this.toastService.show({
          severity: 'success',
          title: 'Coach supprimé',
          content: `Le compte du coach ${
            coach.firstname
          } ${coach.lastname.toUpperCase()} a bien été supprimé.`,
          time: 3000,
        });
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
        this.toastService.show({
          severity: 'error',
          title: 'Suppression échouée',
          content: `Une erreur est survenue lors de la suppression du coach ${
            coach.firstname
          } ${coach.lastname.toUpperCase()}.`,
          sticky: true,
        });
      },
    });
  }
}
