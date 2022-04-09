import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ContextMiddleware } from './context.middleware';

@Module({})
export class ContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
