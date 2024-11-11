import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { CurrentUserInterface } from '../shared/types/current.interface';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  constructor(private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(
            (
              currentUser: CurrentUserInterface & {
                role: 'applicant' | 'university';
              }
            ) => {
              localStorage.setItem('authToken', currentUser.token);
              localStorage.setItem('role', currentUser.role);
              return authActions.loginSuccess({ currentUser });
            }
          ),
          catchError((error) =>
            of(
              authActions.loginFailure({
                error: 'Login failed. Please check your credentials.',
              })
            )
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            // Store the token in localStorage
            localStorage.setItem('authToken', currentUser.token);

            // Dispatch registerSuccess with the current user
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((error) =>
            of(
              authActions.registerFailure({
                error: 'Registration failed. Please try again.',
              })
            )
          )
        )
      )
    )
  );
}
