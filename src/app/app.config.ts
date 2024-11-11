import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideState, provideStore } from '@ngrx/store';
import { authFeatureKey, authReducer } from './auth/store/auth.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    provideEffects(AuthEffects),
  ],
};
