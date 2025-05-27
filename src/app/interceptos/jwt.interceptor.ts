import { HttpInterceptorFn } from '@angular/common/http';
import { k9Config } from '@config/global';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const jwt = localStorage.getItem(k9Config.jwtName);

  if (jwt) {
    const cloneRequestWithJwt = request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return next(cloneRequestWithJwt);
  }

  return next(request);
};
