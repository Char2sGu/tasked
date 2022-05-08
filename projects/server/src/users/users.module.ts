import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';

import { ApplicationsModule } from '../applications/applications.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { MembershipsModule } from '../memberships/memberships.module';
import { SharedModule } from '../shared/shared.module';
import { TasksModule } from '../tasks/tasks.module';
import { TeamsModule } from '../teams/teams.module';
import { User } from './entities/user.entity';
import { UserRefLoader } from './user-ref.loader';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersFieldsResolver } from './users-fields.resolver';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([User]),
    forwardRef(() => TeamsModule),
    forwardRef(() => ApplicationsModule),
    forwardRef(() => MembershipsModule),
    forwardRef(() => TasksModule),
    forwardRef(() => AssignmentsModule),
  ],
  providers: [UsersResolver, UsersFieldsResolver, UsersService, UserRefLoader],
  exports: [UsersService, UserRefLoader],
})
export class UsersModule {}
