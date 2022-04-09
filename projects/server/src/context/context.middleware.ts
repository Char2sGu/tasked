import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { Context } from './context.class';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    new Context(req).apply(next);
  }
}
