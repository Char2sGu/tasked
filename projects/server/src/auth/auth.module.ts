import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { SECRET_KEY } from '../common/env.constants';
import { SharedModule } from '../shared/shared.module';
import { TeamsModule } from '../teams/teams.module';
import { User } from '../users/entities/user.entity';
import { VerificationsModule } from '../verifications/verifications.module';
import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthTokenService } from './auth-token/auth-token.service';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([User]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '3 days' },
    }),
    forwardRef(() => VerificationsModule),
    forwardRef(() => TeamsModule),
  ],
  providers: [
    AuthResolver,
    AuthService,
    AuthTokenService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [AuthService, AuthTokenService],
})
export class AuthModule {}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      user?: User;
      userAuthenticationTask?: Promise<void>;
    }
  }
}
