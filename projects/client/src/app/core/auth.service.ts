import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { default as decodeJwt, JwtPayload } from 'jwt-decode';
import { Observable, of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { skipNullable } from '../common/rxjs';
import { AuthTokenStorage } from '../features/auth/auth-token.storage';
import { AuthGQL, AuthMutation, MeGQL, MeQuery } from '../graphql/codegen';
import { Notifier } from './notifier.service';

type User = MeQuery['me'];
type AuthResult = AuthMutation['auth'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token$ = this.tokenStorage.value$$.pipe(
    map((token) => (token && this.verifyToken(token) ? token : null)),
  );
  user$ = this.watchUser();

  constructor(
    private tokenStorage: AuthTokenStorage,
    private notifier: Notifier,
    private apollo: Apollo,
    private authGql: AuthGQL,
    private meGql: MeGQL,
  ) {}

  login(username: string, password: string): Observable<AuthResult> {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data?.auth),
      skipNullable(),
      tap(({ token }) => this.tokenStorage.next(token).save()),
    );
  }

  logout(): void {
    this.tokenStorage.next(null).save();
    this.apollo.client.clearStore();
    this.notifier.clear();
  }

  private watchUser(): Observable<User | null> {
    return this.token$.pipe(
      switchMap((token) =>
        token
          ? this.meGql
              .watch()
              .valueChanges.pipe(map((result) => result.data.me))
          : of(null),
      ),
      catchError(() => of(null)),
    );
  }

  private verifyToken(token: string): boolean {
    const payload: JwtPayload = decodeJwt(token);
    if (payload.exp && payload.exp < Date.now() / 1000) return false;
    return true;
  }
}
