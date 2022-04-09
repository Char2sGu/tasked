import { MikroOrmModule } from '@mikro-orm/nestjs';
import { forwardRef, Module } from '@nestjs/common';

import { Membership } from '../memberships/entities/membership.entity';
import { MembershipsModule } from '../memberships/memberships.module';
import { SharedModule } from '../shared/shared.module';
import { Task } from '../tasks/entities/task.entity';
import { TasksModule } from '../tasks/tasks.module';
import { AssignmentRefLoader } from './assignment-ref.loader';
import { AssignmentsResolver } from './assignments.resolver';
import { AssignmentsService } from './assignments.service';
import { AssignmentsFieldsResolver } from './assignments-fields.resolver';
import { Assignment } from './entities/assignment.entity';

@Module({
  imports: [
    SharedModule,
    MikroOrmModule.forFeature([Assignment, Membership, Task]),
    forwardRef(() => MembershipsModule),
    forwardRef(() => TasksModule),
  ],
  providers: [
    AssignmentsResolver,
    AssignmentsFieldsResolver,
    AssignmentsService,
    AssignmentRefLoader,
  ],
  exports: [AssignmentsService, AssignmentRefLoader],
})
export class AssignmentsModule {}
