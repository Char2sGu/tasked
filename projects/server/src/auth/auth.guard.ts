import {
  CanActivate,
  CustomDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IncomingHttpHeaders } from 'node:http';

import { ExecutionContextHelper } from '../shared/execution-context/execution-context.helper';
import { AuthTokenService } from './auth-token/auth-token.service';

export const AUTH_GUARD_SKIPPED = Symbol('auth-guard-skip');

/**
 * Prevent the endpoints from being accessed by unauthenticated users and
 * define {@link Request.user}.
 *
 * Use {@link AuthGuardSkip} to ignore this process.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authTokenService: AuthTokenService,
    private executionContextHelper: ExecutionContextHelper,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipped = this.reflector.get<true | undefined>(
      AUTH_GUARD_SKIPPED,
      context.getHandler(),
    );
    if (!skipped) {
      const request = this.executionContextHelper.getRequest(context);
      const result =
        request.userAuthenticationTask ??
        (request.userAuthenticationTask = this.authenticate(context));
      await result;
    }
    return true;
  }

  async authenticate(context: ExecutionContext): Promise<void> {
    const request = this.executionContextHelper.getRequest(context);
    const token = this.getTokenFromHeaders(request.headers);
    if (!token) throw new UnauthorizedException();
    const user = await this.authTokenService.parseAndVerify(token).catch(() => {
      throw new UnauthorizedException();
    });
    request.user = user;
  }

  private getTokenFromHeaders(
    headers: IncomingHttpHeaders,
  ): string | undefined {
    const token = headers.authorization?.slice(7); // `7` is the length of the prefix "Bearer "
    if (!token) throw new UnauthorizedException();
    return token;
  }
}

export const AuthGuardSkipped = (): CustomDecorator<
  typeof AUTH_GUARD_SKIPPED
> => SetMetadata(AUTH_GUARD_SKIPPED, true);
