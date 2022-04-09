import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthGuardContext } from './auth-guard-context.class';

@Injectable()
export class AuthContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    new AuthGuardContext().apply(next);
  }
}
