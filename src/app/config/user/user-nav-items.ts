import { AppRoutes } from '@config/routes';

/* TODO METTRE LES BONNES URL QUAND J'AURAIS LES PAGES DE FINIES */
export const userNavItems: any[] = [
  {
    name: 'dashboard',
    label: 'Dasboard',
    icon: 'ionHomeOutline',
    url: AppRoutes.app.dashboardFull,
  },
  {
    name: 'courses',
    label: 'Les cours',
    icon: 'ionCalendarNumberOutline',
    url: AppRoutes.app.courseFull,
  },
  {
    name: 'dog',
    label: 'Mes chiens',
    icon: 'ionPawOutline',
    url: AppRoutes.app.dogFull,
  },

  // TODO JUSTE POUR LE TEST ADMIN DASHBOARD
  {
    name: 'dash',
    label: 'ADMIN Dashboard',
    icon: 'ionPawOutline',
    url: AppRoutes.app.adminDashFull,
  },
];
