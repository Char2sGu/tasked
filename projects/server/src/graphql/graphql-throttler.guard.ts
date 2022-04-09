import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ExpressContext } from 'apollo-server-express';

@Injectable()
export class GraphqlThrottlerGuard
  extends ThrottlerGuard
  implements CanActivate
{
  getRequestResponse(context: ExecutionContext): ExpressContext {
    const req =
      GqlExecutionContext.create(context).getContext<ExpressContext>().req;
    return { req, res: req.res! };
  }
}
