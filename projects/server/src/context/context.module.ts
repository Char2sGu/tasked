import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ContextMiddleware } from './context.middleware';

@Module({})
export class ContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
