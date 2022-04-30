import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthTokenStorage } from '../features/auth/auth-token.storage';
import { AuthGQL, AuthMutation, MeGQL, MeQuery } from '../graphql/codegen';
import { Notifier } from './notifier.service';

type User = MeQuery['me'];
type AuthResult = AuthMutation['auth'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  private userQuery;

  constructor(
    public token: AuthTokenStorage,
    private notifier: Notifier,
    private apollo: Apollo,
    private authGql: AuthGQL,
    private meGql: MeGQL,
  ) {
    this.userQuery = this.meGql.watch();
    this.user$ = this.userQuery.valueChanges.pipe(
      map(({ data }) => data.me),
      catchError(() => {
        this.token.next(null).save();
        return of(null);
      }),
    );
  }

  login(username: string, password: string): Observable<AuthResult> {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data!.auth),
      tap(({ token }) => {
        this.token.next(token).save();
        this.userQuery.refetch();
      }),
    );
  }

  logout(): void {
    this.token.next(null).save();
    this.apollo.client.clearStore();
    this.notifier.clear();
  }
}
