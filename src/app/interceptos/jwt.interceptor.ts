import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const jwt = localStorage.getItem('jwt');

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
