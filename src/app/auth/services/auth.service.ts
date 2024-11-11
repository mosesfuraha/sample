import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  AuthResponseInterface,
  CurrentUserInterface,
} from '../shared/types/current.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private applicantUrl = 'https://univease.com/api/v1/user/auth';
  private universityUrl = 'https://univease.com/api/v1/university/auth';

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(this.applicantUrl, { email, password })
      .pipe(
        map((response) => {
          console.log('Applicant login successful:', response);
          return {
            ...response.data,
            token: response.token,
            role: 'applicant' as 'applicant' | 'university',
          };
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.http
              .post<AuthResponseInterface>(this.universityUrl, {
                email,
                password,
              })
              .pipe(
                map((response) => {
                  console.log('University login successful:', response);
                  return {
                    ...response.data,
                    token: response.token,
                    role: 'university' as 'applicant' | 'university',
                  };
                }),
                catchError((univError) => {
                  console.error('Both login attempts failed');
                  return throwError(
                    () =>
                      new Error(
                        'Login failed for both applicant and university roles'
                      )
                  );
                })
              );
          }
          return throwError(() => error);
        })
      );
  }

  register(data: any): Observable<CurrentUserInterface> {
    const url = 'https://univease.com/api/v1/user/register';
    return this.http.post<AuthResponseInterface>(url, data).pipe(
      map((response) => {
        console.log('Register response:', response);
        return { ...response.data, token: response.token };
      })
    );
  }
}
