import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MikroRefLoaderContextMiddleware } from './mikro-ref-loader/mikro-ref-loader-context.middleware';

@Module({})
export class MikroMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MikroRefLoaderContextMiddleware).forRoutes('*');
  }
}
