import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

export const superAdminGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (auth.isLogged && auth.userInfos.role === 'ROLE_SUPER_ADMIN') {
    return true;
  }

  return router.parseUrl('/inscription');
};
