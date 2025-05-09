// ANGULAR
import { CommonModule, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

// COMPONENTS
import { CardDogComponent } from '@components/card/card-dog/card-dog.component';
import { CardNextCourseComponent } from '@components/card/card-next-course/card-next-course.component';
import { Tag } from '@components/tag-name/tag-name.type';

// SERVICES
import { UserInfoService } from '@services/user/user-info.service';

/* TODO POUR LES TYPES FAIRE DES FICHIERS DANS LE REPO "models" */
export interface NextCourse {
  name: string;
  date: string;
  tag: Tag;
  description: string;
  dog: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CardDogComponent,
    CardNextCourseComponent,
    TitleCasePipe,
    UpperCasePipe,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  userInfoService: UserInfoService = inject(UserInfoService);
  user$!: Observable<UserInfoDto>;

  ngOnInit() {
    this.user$ = this.userInfoService.getUserInfo();
  }

  nextCourses: NextCourse[] = [
    {
      name: 'Franchissement d’obstacles',
      date: '21 octobre 2025 10h30',
      tag: { name: 'agility' },
      dog: 'Rex',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Choux blanc donc',
      date: '20 avril 2025 9h45',
      tag: { name: 'detection' },
      dog: 'Simba',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Sociabilité',
      date: '18 juin 2025 14h00',
      tag: { name: 'basic' },
      dog: 'Simba',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
    {
      name: 'Initiation au matériel',
      date: '17 mars 2025',
      tag: { name: 'canicross' },
      dog: 'Simba',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    },
  ];
}
