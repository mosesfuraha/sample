import { Route } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const registerRoutes: Route[] = [
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: '',
    component: LoginComponent,
  },
];
