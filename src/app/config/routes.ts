export const AppRoutes = {
  home: '',
  legalNotice: 'mentions-legales',
  termsOfUse: 'conditions-generales-d-utilisation',
  get termsOfUseFull() {
    return `/${this.home}/${this.termsOfUse}`;
  },
  auth: {
    root: 'auth',
    login: 'connexion',
    register: 'inscription',
    get loginFull() {
      return `/${this.root}/${this.login}`;
    },
    get registerFull() {
      return `/${this.root}/${this.register}`;
    },
  },

  // TODO REVOIR ICI LE SYSTEME, PEUT ÊTRE FAIRE DES OBJETS user, admin et coach
  // SI CHANGEMENT FAIT IL FAUDRA REVOIR TOUS LES IMPORTS
  app: {
    root: 'app',
    dashboard: 'dashboard',
    dog: 'mes-chiens',
    course: 'les-cours',
    account: 'mon-compte',
    adminDash: 'admin-dashboard',
    get dashboardFull() {
      return `/${this.root}/${this.dashboard}`;
    },
    get dogFull() {
      return `/${this.root}/${this.dog}`;
    },
    get courseFull() {
      return `/${this.root}/${this.course}`;
    },
    get accountFull() {
      return `/${this.root}/${this.account}`;
    },
    get adminDashFull() {
      return `/${this.root}/${this.adminDash}`;
    },
  },
};
