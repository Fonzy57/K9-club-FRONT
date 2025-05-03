// ANGULAR
import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';
import { CustomIconComponent } from '@components/custom-icon/custom-icon.component';

// PRIME NG
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

// CONFIG
import { AppRoutes } from '@config/routes';

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
  ],
  templateUrl: './admin-coaches.component.html',
  styleUrl: './admin-coaches.component.css',
  providers: [MessageService],
})
export class AdminCoachesComponent {
  AppRoutes = AppRoutes;

  // TODO ICI LES RECUPS DE LA BDD
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
  selectedCoach!: CoachProps;

  constructor(private messageService: MessageService) {}

  // TODO ICI POUR RECUPERER LA LISTE DES COACHS DE LA BDD
  /* ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  } */

  // TODO REVOIR LE SYSTEME DE TOAST CAR J'AI FAIT UN SERVICE
  /* selectCoach(coach: CoachProps) {
    this.messageService.add({
      severity: 'info',
      summary: 'coach Selected',
      detail: coach.firstname,
    });
  } */

  onModifyCoach(coach: CoachProps) {
    console.log('Je modifie le coach : ', coach.firstname, coach.lastname);
  }

  onDeleteCoach(coach: CoachProps) {
    console.log('Je supprime le coach : ', coach.firstname, coach.lastname);
  }
}
