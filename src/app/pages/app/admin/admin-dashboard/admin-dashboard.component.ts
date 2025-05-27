import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  CardInfoComponent,
  Info,
} from '@components/card/card-info/card-info.component';
import { UserInfoService } from '@services/user/user-info.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CardInfoComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {
  userInfoService: UserInfoService = inject(UserInfoService);
  user$!: Observable<OwnerInfoDto>;

  ngOnInit() {
    this.userInfoService.getUserInfos();
    this.user$ = this.userInfoService.user$;
  }

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
