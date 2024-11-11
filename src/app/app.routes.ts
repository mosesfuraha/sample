import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then((m) => m.homeRoutes),
  },
];
