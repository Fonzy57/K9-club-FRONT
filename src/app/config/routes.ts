const appRoot = "app";
const authRoot = "auth";
const adminRoot = "admin";
const coachRoot = "coach";

export const AppRoutes = {
  home: "",
  legalNotice: "mentions-legales",
  termsOfUse: "conditions-generales-d-utilisation",
  get termsOfUseFull() {
    return `/${this.home}/${this.termsOfUse}`;
  },
  auth: {
    root: authRoot,
    register: "inscription",
    login: "connexion",
    get registerFull() {
      return `/${authRoot}/${this.register}`;
    },
    get loginFull() {
      return `/${authRoot}/${this.login}`;
    },
  },
  app: {
    root: appRoot,
    admin: {
      root: adminRoot,
      dashboard: "dashboard",
      coaches: "coachs",
      addCoach: "ajouter",
      updateCoach: "modifier",
      courses: "cours",
      addCourse: "ajouter",
      updateCourse: "modifier",
      account: "mon-compte",
      get dashboardFull() {
        return `/${appRoot}/${this.root}/${this.dashboard}`;
      },
      get coachesFull() {
        return `/${appRoot}/${this.root}/${this.coaches}`;
      },
      get coursesFull() {
        return `/${appRoot}/${this.root}/${this.courses}`;
      },
      /* get addCoachFull() {
        return `/${appRoot}/${this.root}/${this.addCoach}`;
      },
      get updateCoachFull() {
        return `/${appRoot}/${this.root}/${this.updateCoach}`;
      }, */
      get accountFull() {
        return `/${appRoot}/${this.root}/${this.account}`;
      },
    },
    coach: {
      root: coachRoot,
      dashboard: "dashboard",
      courses: "cours",
      addCourse: "ajouter",
      updateCourse: "modifier",
      get dashboardFull() {
        return `/${appRoot}/${this.root}/${this.dashboard}`;
      },
      get coursesFull() {
        return `/${appRoot}/${this.root}/${this.courses}`;
      },
      /* get addCoachFull() {
        return `/${appRoot}/${this.root}/${this.addCoach}`;
      },
      get updateCoachFull() {
        return `/${appRoot}/${this.root}/${this.updateCoach}`;
      }, */
    },
    user: {
      dashboard: "dashboard",
      dog: "mes-chiens",
      addDog: "ajouter",
      course: "les-cours",
      account: "mon-compte",
      get dashboardFull() {
        return `/${appRoot}/${this.dashboard}`;
      },
      get dogFull() {
        return `/${appRoot}/${this.dog}`;
      },
      get courseFull() {
        return `/${appRoot}/${this.course}`;
      },
      get accountFull() {
        return `/${appRoot}/${this.account}`;
      },
    },
  },
};
