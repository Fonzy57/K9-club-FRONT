import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;

  // TODO REVOIR LE TYPE
  userInfos: any | null = null;

  constructor() {
    const jwt: string | null = localStorage.getItem('jwt');

    if (jwt !== null) {
    }
  }

  decodeJwt = (jwt: string) => {
    localStorage.setItem('jwt', jwt);

    const middleOfJwt = jwt.split('.')[1];

    const jwtBody = atob(middleOfJwt);

    const body = JSON.parse(jwtBody);

    this.userInfos = body;
    this.isLogged = true;
  };

  logout = () => {
    localStorage.removeItem('jwt');
    this.isLogged = false;
    this.userInfos = null;
  };
}
