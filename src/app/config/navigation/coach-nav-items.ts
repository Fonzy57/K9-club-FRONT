import { AppRoutes } from '@config/routes';

export const coachNavItems: any[] = [
  {
    name: 'dash',
    label: 'Dashboard',
    icon: 'ionHomeOutline',
    url: AppRoutes.app.coach.dashboardFull,
  },
  {
    name: 'courses',
    label: 'Les cours',
    icon: 'ionCalendarNumberOutline',
    url: AppRoutes.app.coach.coursesFull,
  },
];
