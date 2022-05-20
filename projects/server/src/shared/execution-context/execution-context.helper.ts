import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { ExpressContext } from 'apollo-server-express';
import { Request } from 'express';

@Injectable()
export class ExecutionContextHelper {
  getRequest(context: ExecutionContext): Request {
    return context.getType<GqlContextType>() === 'graphql'
      ? GqlExecutionContext.create(context).getContext<ExpressContext>().req
      : context.switchToHttp().getRequest<Request>();
  }
}
