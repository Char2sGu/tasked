import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';

import { Membership } from '../memberships/entities/membership.entity';
import { SharedModule } from '../shared/shared.module';
import { Team } from '../teams/entities/team.entity';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { ApplicationRefLoader } from './application-ref.loader';
import { ApplicationsResolver } from './applications.resolver';
import { ApplicationsService } from './applications.service';
import { ApplicationsFieldsResolver } from './applications-fields.resolver';
import { Application } from './entities/application.entity';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([Application, Membership, Team]),
    forwardRef(() => UsersModule),
    forwardRef(() => TeamsModule),
  ],
  providers: [
    ApplicationsResolver,
    ApplicationsFieldsResolver,
    ApplicationsService,
    ApplicationRefLoader,
  ],
  exports: [ApplicationsService, ApplicationRefLoader],
})
export class ApplicationsModule {}
