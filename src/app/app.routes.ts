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
  // --- PUBLIC SITE ---
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

  // --- AUTH (registration / login) ---
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

  // --- APP (admins, coaches, owners) ---
  {
    path: AppRoutes.app.root, // 'app'
    component: AppLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      // 1) /app redirects to home page
      // TODO CHANGER ICI SELON LE ROLE, FAIRE UN GUARD QUI RENVOIE SUR LE BON DASHBOARD SELON LE ROLE
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.home, // 'dashboard'
      },

      // 2) “owner” routes (ROLE_OWNER / ROLE_COACH / ROLE_SUPER_ADMIN if desired)
      {
        path: '',
        canActivateChild: [ownerGuard],
        children: [
          {
            path: AppRoutes.app.user.dashboard, // 'dashboard'
            component: DashboardComponent,
          },
          {
            path: AppRoutes.app.user.dog, // 'mes-chiens'
            component: DogComponent,
          },
          {
            path: AppRoutes.app.user.course, // 'les-cours'
            component: CourseComponent,
          },
          {
            path: AppRoutes.app.user.account, // 'mon-compte'
            component: UserAccountComponent,
          },
        ],
      },

      // 3) “admin” routes
      {
        path: AppRoutes.app.admin.root, // 'admin'
        canActivateChild: [adminGuard],
        children: [
          {
            path: AppRoutes.app.admin.dashboard, // 'dashboard' (same segment)
            component: AdminDashboardComponent,
          },
          /* {
            path: AppRoutes.app.admin.account,    // 'mon-compte'
            component: AdminAccountComponent,
          }, */
        ],
      },
    ],
  },

  // --- CATCH ALL ---
  { path: '**', redirectTo: AppRoutes.home },
];
