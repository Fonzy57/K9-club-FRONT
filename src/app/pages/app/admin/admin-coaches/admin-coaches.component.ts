// ANGULAR
import { Component, inject } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';

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
export class AdminCoachesComponent {
  AppRoutes = AppRoutes;
  toastService: ToastMessageService = inject(ToastMessageService);

  constructor(private confirmationService: ConfirmationService) {}

  // TODO ICI LES RECUPS DE LA BDD
  // TODO ICI POUR RECUPERER LA LISTE DES COACHS DE LA BDD
  /* ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  } */
  coaches: CoachProps[] = [
    {
      id: 1,
      firstname: 'Stéphane',
      lastname: 'Scheeres',
      email: 'super-admin@k9club.fr',
      createdAt: '2025-05-03 13:35:03.000000',
      updatedAt: '2025-05-03 13:35:03.000000',
    },
    {
      id: 2,
      firstname: 'Victor',
      lastname: 'Monteragioni',
      email: 'admin@k9club.fr',
      createdAt: '2025-05-03 13:35:03.000000',
      updatedAt: '2025-05-03 13:35:03.000000',
    },
    {
      id: 1,
      firstname: 'Tetiana',
      lastname: 'Lombardi',
      email: 'coach@k9club.fr',
      createdAt: '2025-05-03 13:35:03.000000',
      updatedAt: '2025-05-03 13:35:03.000000',
    },
  ];

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
