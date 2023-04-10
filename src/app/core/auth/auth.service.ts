import { Injectable } from '@angular/core';
import { directus } from 'app/services/directus';
import {
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError
} from 'rxjs';
import { User } from '../user/user.types';
import { authStore } from './auth.repository';

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  get accessToken(): string {
    return localStorage.getItem('auth_token') ?? '';
  }

  /**
   * Setter & getter for expires_at
   */
  set expiresAt(expiry: string) {
    localStorage.setItem('auth_expires_at', expiry);
  }

  get expiresAt(): string {
    return localStorage.getItem('auth_expires_at') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return from(directus.auth.password.request(email));
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return from(directus.auth.password.reset('', password));
  }

  refreshToken(): Observable<any> {
    return from(directus.auth.refresh());
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError(() => 'User is already logged in.');
    }

    return from(directus.auth.login(credentials)).pipe(
      switchMap((response: any) => {
        // Set the authenticated flag to true
        this._authenticated = true;

        // Get user data
        const userRes = from(directus.users.me.read()).pipe(
          map((x) => {
            const userObj: User = {
              email: x.email,
              avatar: x.avatar,
              name: x.first_name,
              id: x.id,
              status: 'online',
            };
            return userObj;
          })
        );

        userRes.subscribe((x) => {
          authStore.update((state) => ({
            ...state,
            user: x,
          }));
        });

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return from(directus.auth.logout());
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return from(directus.users.createOne(user));
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    return from(directus.auth.token).pipe(map((x) => !!x));
  }
}
