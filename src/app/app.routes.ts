import { Routes } from '@angular/router';
import { AppRoutes } from '@config/routes';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { HomeComponent } from '@pages/home/home.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { LoginComponent } from '@pages/auth/login/login.component';
import { AppLayoutComponent } from '@layouts/app-layout/app-layout.component';
import { DashboardComponent } from '@pages/app/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: AppRoutes.home,
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: AppRoutes.auth.root,
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.auth.register, // If user go to /auth he'll be redirect to /auth/inscription
      },
      {
        path: AppRoutes.auth.register,
        component: RegisterComponent,
        data: {
          title: 'Rejoignez la communauté K9 Club',
          subtitle:
            'Inscrivez-vous pour accéder à nos services dédiés aux passionnés de chiens.',
        },
      },
      {
        path: AppRoutes.auth.login,
        component: LoginComponent,
        data: {
          title: 'Connectez-vous à votre espace K9 Club',
          subtitle:
            'Accédez à votre compte et profitez de tous nos services dédiés aux passionnés de chiens.',
        },
      },
    ],
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // d'autres routes protégées ici
    ],
  },
  { path: '**', redirectTo: '' },
];
