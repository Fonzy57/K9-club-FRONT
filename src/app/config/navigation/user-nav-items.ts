import { AppRoutes } from '@config/routes';

/* TODO METTRE LES BONNES URL QUAND J'AURAIS LES PAGES DE FINIES */
export const userNavItems: any[] = [
  {
    name: 'dashboard',
    label: 'Dasboard',
    icon: 'ionHomeOutline',
    url: AppRoutes.app.user.dashboardFull,
  },
  {
    name: 'courses',
    label: 'Cours',
    icon: 'ionCalendarNumberOutline',
    url: AppRoutes.app.user.courseFull,
  },
  {
    name: 'dog',
    label: 'Chiens',
    icon: 'ionPawOutline',
    url: AppRoutes.app.user.dogFull,
  },
];
