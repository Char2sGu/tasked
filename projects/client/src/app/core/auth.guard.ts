import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(): UrlTree | Observable<boolean | UrlTree> {
    const redirection = this.router.createUrlTree(['/auth']);
    return this.auth.user$.pipe(map((user) => !!user || redirection));
  }
}
