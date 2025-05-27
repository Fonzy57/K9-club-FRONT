// ANGULAR
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { k9Config } from '@config/global';

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
    const jwt: string | null = localStorage.getItem(k9Config.jwtName);

    if (jwt !== null) {
      this.decodeJwt(jwt);
    }
  }

  decodeJwt = (jwt: string) => {
    localStorage.setItem(k9Config.jwtName, jwt);

    const middleOfJwt = jwt.split('.')[1];

    const jwtBody = atob(middleOfJwt);

    const body: JwtUserInfos = JSON.parse(jwtBody);

    this.userInfos = body;
    this.isLogged = true;
  };

  logout = () => {
    localStorage.removeItem(k9Config.jwtName);
    this.isLogged = false;
    this.userInfos = null;
    this.router.navigateByUrl(AppRoutes.auth.loginFull);
  };
}
