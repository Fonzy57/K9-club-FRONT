import { Routes } from '@angular/router';
import { AppRoutes } from '@config/routes';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { HomeComponent } from '@pages/home/home.component';
import { RegisterComponent } from '@pages/auth/register/register.component';
import { LoginComponent } from '@pages/auth/login/login.component';
import { AppLayoutComponent } from '@layouts/app-layout/app-layout.component';
import { DashboardComponent } from '@pages/app/user/dashboard/dashboard.component';
import { DogComponent } from '@pages/app/user/dog/dog.component';
import { CourseComponent } from '@pages/app/user/course/course.component';
import { UserAccountComponent } from '@pages/app/user/user-account/user-account.component';
import { LegalNoticeComponent } from '@pages/legal-notice/legal-notice.component';
import { TermsOfUseComponent } from '@pages/terms-of-use/terms-of-use.component';
import { AdminDashboardComponent } from '@pages/app/admin/admin-dashboard/admin-dashboard.component';
import { loggedGuard } from './guards/logged.guard';
import { ownerGuard } from './guards/owner.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: AppRoutes.home,
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: AppRoutes.legalNotice, component: LegalNoticeComponent },
      {
        path: AppRoutes.termsOfUse,
        component: TermsOfUseComponent,
      },
    ],
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
    canActivate: [loggedGuard],
    children: [
      {
        // TODO VOIR CETTE REDIRECTION CAR SI C'EST UN OWNER, ADMIN OU COACH ON NE LES RENVOIE PAS
        // AU MEME ENDROIT
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.app.dashboard, // If user go to /app he'll be redirect to /app/dashboard
      },
      {
        path: AppRoutes.app.dashboard,
        component: DashboardComponent,
        canActivate: [ownerGuard],
      },
      {
        path: AppRoutes.app.dog,
        component: DogComponent,
        canActivate: [ownerGuard],
      },
      {
        path: AppRoutes.app.course,
        component: CourseComponent,
        canActivate: [ownerGuard],
      },
      {
        path: AppRoutes.app.account,
        component: UserAccountComponent,
        canActivate: [ownerGuard],
      },
      {
        path: AppRoutes.app.adminDash,
        component: AdminDashboardComponent,
        canActivate: [adminGuard],
      },
      // d'autres routes protégées ici
    ],
  },
  { path: '**', redirectTo: '' },
];
