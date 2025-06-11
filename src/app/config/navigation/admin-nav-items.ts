import { AppRoutes } from "@config/routes";

export const adminNavItems: any[] = [
  {
    name: "dash",
    label: "Dashboard",
    icon: "ionHomeOutline",
    url: AppRoutes.app.admin.dashboardFull,
  },
  {
    name: "coaches",
    label: "Coachs",
    icon: "ionTennisballOutline",
    url: AppRoutes.app.admin.coachesFull,
  },
  {
    name: "courses",
    label: "Cours",
    icon: "ionCalendarNumberOutline",
    url: AppRoutes.app.admin.coursesFull,
  },
];
