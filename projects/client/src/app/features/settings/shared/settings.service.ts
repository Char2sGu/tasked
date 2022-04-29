import { Injectable } from '@angular/core';
import { concatMap, first, map, Observable, Observer } from 'rxjs';

import { skipFalsy } from '../../../common/rxjs';
import { AuthService } from '../../../core/auth.service';
import { Notifier } from '../../../core/notifier.service';
import { UserFragment, UserUpdateGQL, UserUpdateInput } from '../../../graphql';

export type User = UserFragment;

@Injectable()
export class SettingsService {
  user$ = this.authService.user$.pipe(skipFalsy());

  constructor(
    private authService: AuthService,
    private notifier: Notifier,
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
      next: () => this.notifier.success(onsuccess),
      error: () => this.notifier.error(onerror),
    };
  }
}
