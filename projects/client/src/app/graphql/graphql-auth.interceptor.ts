import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../core/auth.service';

@Injectable()
export class GraphqlAuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.auth.token.value)
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.auth.token.value}` },
      });
    return next.handle(request);
  }
}
