import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import dayjs from 'dayjs';
import { default as decodeJwt, JwtPayload } from 'jwt-decode';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';

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
  readonly authorization$: Observable<Authorization | null> =
    this.tokenStorage.value$$.pipe(
      map((token) => {
        if (!token) return null;
        const payload: JwtPayload = decodeJwt(token);
        if (!payload.exp) return null;
        const expiresAfter = dayjs(payload.exp * 1000).diff();
        const authorization: Authorization = {
          token,
          expiresAfter: expiresAfter > 0 ? expiresAfter : 0,
        };
        return authorization;
      }),
    );
  readonly user$ = this.watchUser();

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
    return this.authorization$.pipe(
      switchMap((authorization) =>
        authorization
          ? this.meGql
              .watch()
              .valueChanges.pipe(map((result) => result.data.me))
          : of(null),
      ),
      catchError(() => of(null)),
    );
  }
}

export interface Authorization {
  token: string;
  expiresAfter: number;
}
