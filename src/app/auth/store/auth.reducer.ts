import { CurrentUserInterface } from './../shared/types/current.interface';
import { AuthStateInterface } from './../shared/types/authState.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  role: null,
  error: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    // Register actions
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      error: null,
    })),
    on(authActions.registerSuccess, (state, { currentUser }) => ({
      ...state,
      isSubmitting: false,
      currentUser,
      error: null,
    })),
    on(authActions.registerFailure, (state) => ({
      ...state,
      isSubmitting: false,
      error: 'Registration failed. Please try again.',
    })),

    // Login actions
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      error: null,
    })),
    on(authActions.loginSuccess, (state, { currentUser }) => ({
      ...state,
      isSubmitting: false,
      currentUser,
      role: currentUser.role as 'applicant' | 'university',
      error: null,
    })),

    on(authActions.loginFailure, (state, { error }) => ({
      ...state,
      isSubmitting: false,
      error,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectError,
} = authFeature;
