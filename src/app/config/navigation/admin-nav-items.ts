import { AppRoutes } from '@config/routes';

export const adminNavItems: any[] = [
  {
    name: 'dash',
    label: 'Dashboard',
    icon: 'ionHomeOutline',
    url: AppRoutes.app.admin.dashboardFull,
  },
  {
    name: 'coaches',
    label: 'Les coachs',
    icon: 'ionBodyOutline',
    url: AppRoutes.app.admin.coachesFull,
  },
];
