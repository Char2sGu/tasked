import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { Membership } from '../memberships/entities/membership.entity';
import { User } from '../users/entities/user.entity';
import { MembershipInvitation } from './entities/membership-invitation.entity';
import { MembershipInvitationsResolver } from './membership-invitations.resolver';
import { MembershipInvitationsService } from './membership-invitations.service';

// TODO: tests

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([MembershipInvitation, Membership, User]),
  ],
  providers: [MembershipInvitationsResolver, MembershipInvitationsService],
  exports: [MembershipInvitationsService],
})
export class MembershipInvitationsModule {}
