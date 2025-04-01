import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // TODO AJOUTER LA PAGE QUAND ELLE SERA PRETE
    /* children: [
      { path: '', component: HomeComponent },
    ] */
  },
  /* {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // d'autres routes protégées ici
    ]
  },
  { path: '**', redirectTo: '' } */
];
