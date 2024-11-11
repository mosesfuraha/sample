import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const token = localStorage.getItem('authToken');

  const authReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(authReq).pipe(
    tap((event) => {
      if (event.type === 4 && (event.body as { token?: string })?.token) {
        localStorage.setItem(
          'authToken',
          (event.body as { token: string }).token
        );
      }
    })
  );
};
