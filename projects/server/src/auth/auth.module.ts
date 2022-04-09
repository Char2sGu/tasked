import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { SECRET_KEY } from '../common/env.constants';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthContextMiddleware } from './auth-context.middleware';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1 weeks' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthContextMiddleware).forRoutes('*');
  }
}
