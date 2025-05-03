// ANGULAR
import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';

// COMPONENTS
import { ButtonComponent } from '@components/button/button.component';

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
  ],
  templateUrl: './admin-coaches.component.html',
  styleUrl: './admin-coaches.component.css',
  providers: [MessageService],
})
export class AdminCoachesComponent {
  AppRoutes = AppRoutes;
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

  selectedCoach!: CoachProps;

  constructor(private messageService: MessageService) {}

  /* ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  } */

  selectCoach(coach: CoachProps) {
    this.messageService.add({
      severity: 'info',
      summary: 'coach Selected',
      detail: coach.firstname,
    });
  }
}
