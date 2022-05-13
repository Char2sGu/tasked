import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { MembershipRequestsModule } from '../membership-requests/membership-requests.module';
import { Membership } from '../memberships/entities/membership.entity';
import { MembershipsModule } from '../memberships/memberships.module';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { Team } from './entities/team.entity';
import { TeamMembershipLoader } from './team-membership.loader';
import { TeamRefLoader } from './team-ref.loader';
import { TeamsResolver } from './teams.resolver';
import { TeamsService } from './teams.service';
import { TeamsFieldsResolver } from './teams-fields.resolver';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([Team, Membership]),
    forwardRef(() => UsersModule),
    forwardRef(() => MembershipRequestsModule),
    forwardRef(() => MembershipsModule),
    forwardRef(() => TasksModule),
    forwardRef(() => AssignmentsModule),
  ],
  providers: [
    TeamsResolver,
    TeamsFieldsResolver,
    TeamsService,
    TeamRefLoader,
    TeamMembershipLoader,
  ],
  exports: [TeamsService, TeamRefLoader],
})
export class TeamsModule {}
