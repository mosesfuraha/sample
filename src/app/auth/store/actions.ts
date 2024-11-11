import { createActionGroup, props } from '@ngrx/store';
import { CurrentUserInterface } from '../shared/types/current.interface';

// Define the actions including login with role
export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    // Register actions
    Register: props<{ request: any }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ error: string }>(),

    // Login actions with role included
    Login: props<{
      email: string;
      password: string;
      role: 'applicant' | 'university';
    }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ error: string }>(),
  },
});
