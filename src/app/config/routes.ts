export const AppRoutes = {
  home: '',
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
  app: {
    root: 'app',
    dashboard: 'dashboard',
    dog: 'mes-chiens',
    course: 'les-cours',
    account: 'mon-compte',
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
  },
};
