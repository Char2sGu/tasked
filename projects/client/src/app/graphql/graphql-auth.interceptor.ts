import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, first, map, Observable } from 'rxjs';

import { AuthService } from '../core/auth.service';

@Injectable()
export class GraphqlAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.authService.authorization$.pipe(
      first(),
      map((authorization) =>
        authorization
          ? request.clone({
              setHeaders: {
                ['Authorization']: `Bearer ${authorization.token}`,
              },
            })
          : request,
      ),
      concatMap((request) => next.handle(request)),
    );
  }
}
