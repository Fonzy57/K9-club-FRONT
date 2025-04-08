import { Component } from '@angular/core';
import {
  CardInfoComponent,
  Info,
} from '@components/card/card-info/card-info.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CardInfoComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  informations: Info[] = [
    {
      name: "Nombre d'adhérents",
      number: 200,
      tooltip:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: "Nombre d'adhérents",
      number: 200,
      tooltip:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Nombre de coachs',
      number: 9,
      tooltip:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Nombre de chiens',
      number: 257,
      tooltip:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Nombre de cours cette semaine',
      number: 200,
      tooltip:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Nombre de cours ce mois',
      number: 42,
      tooltip:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Taux remplissage des cours',
      number: 57,
      tooltip:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Nombre de nouveaux inscrit (ce mois-ci)',
      number: 21,
      tooltip:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
  ];
}
