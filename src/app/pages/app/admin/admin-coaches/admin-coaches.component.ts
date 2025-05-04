// ANGULAR
import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

// PRIME NG
import { ConfirmationService, MessageService } from 'primeng/api';
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

// TYPE
interface CoachProps {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

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
  ],
  templateUrl: './admin-coaches.component.html',
  styleUrl: './admin-coaches.component.css',
  providers: [ConfirmationService],
})
export class AdminCoachesComponent implements OnInit {
  AppRoutes = AppRoutes;
  toastService: ToastMessageService = inject(ToastMessageService);
  http: HttpClient = inject(HttpClient);

  coaches: CoachProps[] = [];

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.http.get<CoachProps[]>(apiRoot + 'coaches').subscribe({
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

  // TODO A SUPPRIMER SI PAS UTILISÉ
  /* selectedCoach!: CoachProps; */

  onModifyCoach(coach: CoachProps) {
    console.log('Je modifie le coach : ', coach.firstname, coach.lastname);
  }

  onConfirmDelete(coach: CoachProps) {
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

  // TODO ICI CALL A L'API POUR SUPPRIMER UN COACH
  onDeleteCoach(coach: CoachProps) {
    console.log('Je supprime le coach : ', coach.firstname, coach.lastname);

    // TODO AJOUTER LE TOAST AU RETOUR DE LA REQUÊTE
    this.toastService.show({
      severity: 'success',
      title: 'Coach supprimé',
      content: `Le compte du coach ${
        coach.firstname
      } ${coach.lastname.toUpperCase()} a bien été supprimé.`,
      time: 5000,
    });
  }
}
