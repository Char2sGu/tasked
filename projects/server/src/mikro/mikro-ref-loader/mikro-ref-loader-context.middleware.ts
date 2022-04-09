import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { EntityRefLoader } from '../../common/entity-ref-loader.class';
import { MikroRefLoaderContext } from './mikro-ref-loader-context.class';

/**
 * @deprecated
 * @see {EntityRefLoader}
 */
@Injectable()
export class MikroRefLoaderContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    new MikroRefLoaderContext().apply(next);
  }
}

EntityRefLoader;
