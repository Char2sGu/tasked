import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(): UrlTree | Observable<boolean | UrlTree> {
    const redirection = this.router.createUrlTree(['/auth']);
    // Check the token first because subscribing `user$` may cause a request
    // when the cache is cleared.
    return this.auth.token.value
      ? this.auth.user$.pipe(map((user) => !!user || redirection))
      : redirection;
  }
}
