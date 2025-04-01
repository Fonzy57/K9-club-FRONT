import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { HomeComponent } from '@pages/home/home.component';
import { RegisterComponent } from '@pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'auth',
    /* pathMatch: 'full',
    redirectTo: 'connexion', */
    component: AuthLayoutComponent,
    children: [
      {
        path: 'inscription',
        component: RegisterComponent,
        data: {
          title: 'Rejoignez la communauté K9 Club',
          subtitle:
            'Inscrivez-vous pour accéder à nos services dédiés aux passionnés de chiens.',
        },
      },
      /* { path: 'connexion', component: LoginComponent }, */
    ],
  },
  /* {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // d'autres routes protégées ici
    ]
  },
  { path: '**', redirectTo: '' } */
];
