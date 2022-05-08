import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';

import { AssignmentsModule } from '../assignments/assignments.module';
import { Assignment } from '../assignments/entities/assignment.entity';
import { SharedModule } from '../shared/shared.module';
import { TasksModule } from '../tasks/tasks.module';
import { TeamsModule } from '../teams/teams.module';
import { UsersModule } from '../users/users.module';
import { Membership } from './entities/membership.entity';
import { MembershipRefLoader } from './membership-ref.loader';
import { MembershipsResolver } from './memberships.resolver';
import { MembershipsService } from './memberships.service';
import { MembershipsFieldsResolver } from './memberships-fields.resolver';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([Membership, Assignment]),
    forwardRef(() => UsersModule),
    forwardRef(() => TeamsModule),
    forwardRef(() => AssignmentsModule),
    forwardRef(() => TasksModule),
  ],
  providers: [
    MembershipsResolver,
    MembershipsFieldsResolver,
    MembershipsService,
    MembershipRefLoader,
  ],
  exports: [MembershipsService, MembershipRefLoader],
})
export class MembershipsModule {}
