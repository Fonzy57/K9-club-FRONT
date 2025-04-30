const appRoot = 'app';
const authRoot = 'auth';
const adminRoot = 'admin';

export const AppRoutes = {
  home: '',
  legalNotice: 'mentions-legales',
  termsOfUse: 'conditions-generales-d-utilisation',
  get termsOfUseFull() {
    return `/${this.home}/${this.termsOfUse}`;
  },
  auth: {
    root: authRoot,
    register: 'inscription',
    login: 'connexion',
    get registerFull() {
      return `/${authRoot}/${this.register}`;
    },
    get loginFull() {
      return `/${authRoot}/${this.login}`;
    },
  },
  app: {
    root: appRoot,
    user: {
      dashboard: 'dashboard',
      dog: 'mes-chiens',
      course: 'les-cours',
      account: 'mon-compte',
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
    admin: {
      root: adminRoot,
      dashboard: 'dashboard',
      account: 'mon-compte',
      get dashboardFull() {
        return `/${appRoot}/${this.root}/${this.dashboard}`;
      },
      get accountFull() {
        return `/${appRoot}/${this.root}/${this.account}`;
      },
    },
  },
};
