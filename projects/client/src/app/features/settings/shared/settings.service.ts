import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap, first, map, Observable, Observer } from 'rxjs';

import { skipFalsy } from '../../../common/rxjs';
import { UserFragment, UserUpdateGQL, UserUpdateInput } from '../../../graphql';
import { AuthService } from '../../../core/auth.service';

export type User = UserFragment;

@Injectable()
export class SettingsService {
  user$ = this.authService.user$.pipe(skipFalsy());

  constructor(
    private authService: AuthService,
    private snackbarService: MatSnackBar,
    private userUpdateGql: UserUpdateGQL,
  ) {}

  saveProfile(data: UserUpdateInput): Observable<User> {
    return this.authService.user$.pipe(
      skipFalsy(),
      first(),
      concatMap(({ id }) => this.userUpdateGql.mutate({ id, data })),
      map((result) => result.data),
      skipFalsy(),
      map((data) => data.updateUser),
    );
  }

  buildNotifyingObserver<T>(
    onsuccess: string,
    onerror: string,
  ): Partial<Observer<T>> {
    return {
      next: () =>
        this.snackbarService.open(onsuccess, 'Got it', { duration: 3000 }),
      error: () =>
        this.snackbarService.open(onerror, 'Fine', { duration: 3000 }),
    };
  }
}
