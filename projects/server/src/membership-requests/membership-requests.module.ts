import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';

import { Membership } from '../memberships/entities/membership.entity';
import { SharedModule } from '../shared/shared.module';
import { Team } from '../teams/entities/team.entity';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { MembershipRequest } from './entities/membership-request.entity';
import { MembershipRequestRefLoader } from './membership-request-ref.loader';
import { MembershipRequestsResolver } from './membership-requests.resolver';
import { MembershipRequestsService } from './membership-requests.service';
import { MembershipRequestsFieldsResolver } from './membership-requests-fields.resolver';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([MembershipRequest, Membership, Team]),
    forwardRef(() => UsersModule),
    forwardRef(() => TeamsModule),
  ],
  providers: [
    MembershipRequestsResolver,
    MembershipRequestsFieldsResolver,
    MembershipRequestsService,
    MembershipRequestRefLoader,
  ],
  exports: [MembershipRequestsService, MembershipRequestRefLoader],
})
export class MembershipRequestsModule {}
