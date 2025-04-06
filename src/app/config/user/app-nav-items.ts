import { AppRoutes } from '@config/routes';

/* TODO METTRE LES BONNES URL QUAND J'AURAIS LES PAGES DE FINIES */
export const navItems: any[] = [
  {
    name: 'dashboard',
    label: 'Dasboard',
    icon: 'ionHomeOutline',
    url: AppRoutes.app.dashboardFull,
  },
  {
    name: 'dog',
    label: 'Mes chiens',
    icon: 'ionPawOutline',
    url: AppRoutes.app.dogFull,
  },
  {
    name: 'courses',
    label: 'Les cours',
    icon: 'ionCalendarNumberOutline',
    url: AppRoutes.app.courseFull,
  },
];
