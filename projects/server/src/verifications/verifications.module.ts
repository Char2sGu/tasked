import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { SharedModule } from '../shared/shared.module';
import { Verification } from './entities/verification.entity';
import { VerificationsResolver } from './verifications.resolver';
import { VerificationsService } from './verifications.service';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([Verification]),
    MailerModule,
  ],
  providers: [VerificationsResolver, VerificationsService],
  exports: [VerificationsService],
})
export class VerificationsModule {}
