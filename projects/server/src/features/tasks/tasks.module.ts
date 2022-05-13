import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { AssignmentsModule } from '../assignments/assignments.module';
import { Membership } from '../memberships/entities/membership.entity';
import { MembershipsModule } from '../memberships/memberships.module';
import { Task } from './entities/task.entity';
import { TaskRefLoader } from './task-ref.loader';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { TasksFieldsResolver } from './tasks-fields.resolver';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([Task, Membership]),
    forwardRef(() => AssignmentsModule),
    forwardRef(() => MembershipsModule),
  ],
  providers: [TasksResolver, TasksFieldsResolver, TasksService, TaskRefLoader],
  exports: [TasksService, TaskRefLoader],
})
export class TasksModule {}
