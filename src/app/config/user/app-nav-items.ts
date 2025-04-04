import { AppRoutes } from '@config/routes';

/* TODO METTRE LES BONNES URL QUAND J'AURAIS LES PAGES DE FINIES */
export const navItems: any[] = [
  {
    name: 'dashboard',
    label: 'Dasboard',
    icon: 'home',
    url: AppRoutes.app.dashboardFull,
  },
  { name: 'dog', label: 'Mes chiens', icon: 'dog', url: AppRoutes.app.dogFull },
  { name: 'courses', label: 'Les cours', icon: 'course', url: '#' },
];
