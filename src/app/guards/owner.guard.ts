import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppRoutes } from '@config/routes';
import { AuthService } from '@services/auth/auth.service';

export const ownerGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (auth.isLogged && auth.userInfos && auth.userInfos.role === 'ROLE_OWNER') {
    return true;
  }

  return router.parseUrl(AppRoutes.auth.loginFull);
};
