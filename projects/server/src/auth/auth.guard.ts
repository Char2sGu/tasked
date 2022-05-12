import {
  CanActivate,
  CustomDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { ExpressContext } from 'apollo-server-express';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { AuthGuardContext } from './auth-guard-context.class';

export const AUTH_GUARD_SKIPPED = Symbol('auth-guard-skip');

/**
 * Prevent the endpoints from being accessed by unauthenticated users and
 * define {@link Request.user}.
 *
 * Use {@link AuthGuardSkip} to ignore this process.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private service: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipped = this.reflector.get<true | undefined>(
      AUTH_GUARD_SKIPPED,
      context.getHandler(),
    );

    if (!skipped) {
      const result =
        AuthGuardContext.current.result ??
        (AuthGuardContext.current.result = this.authenticate(context));
      await result;
    }

    return true;
  }

  async authenticate(context: ExecutionContext): Promise<void> {
    const request = this.getRequest(context);
    const token = this.service.getJwtFromHeaders(request.headers);
    const user = await this.service.verifyJwt(token);
    request.user = user;
  }

  private getRequest(context: ExecutionContext) {
    return context.getType<GqlContextType>() == 'graphql'
      ? GqlExecutionContext.create(context).getContext<ExpressContext>().req
      : context.switchToHttp().getRequest<Request>();
  }
}

export const AuthGuardSkipped = (): CustomDecorator<
  typeof AUTH_GUARD_SKIPPED
> => SetMetadata(AUTH_GUARD_SKIPPED, true);
