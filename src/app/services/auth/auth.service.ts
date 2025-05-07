// ANGULAR
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

// CONFIG
import { AppRoutes } from '@config/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;
  router: Router = inject(Router);

  userInfos: JwtUserInfos | null = null;

  constructor() {
    const jwt: string | null = localStorage.getItem('jwt');

    if (jwt !== null) {
      this.decodeJwt(jwt);
    }
  }

  decodeJwt = (jwt: string) => {
    localStorage.setItem('jwt', jwt);

    const middleOfJwt = jwt.split('.')[1];

    const jwtBody = atob(middleOfJwt);

    const body: JwtUserInfos = JSON.parse(jwtBody);

    this.userInfos = body;
    this.isLogged = true;
  };

  logout = () => {
    localStorage.removeItem('jwt');
    this.isLogged = false;
    this.userInfos = null;
    this.router.navigateByUrl(AppRoutes.auth.loginFull);
  };
}
