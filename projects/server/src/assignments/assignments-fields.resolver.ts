import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Membership } from '../memberships/entities/membership.entity';
import { MembershipRefLoader } from '../memberships/membership-ref.loader';
import { Task } from '../tasks/entities/task.entity';
import { TaskRefLoader } from '../tasks/task-ref.loader';
import { Assignment } from './entities/assignment.entity';

@Resolver(() => Assignment)
export class AssignmentsFieldsResolver {
  constructor(
    private membershipRefLoader: MembershipRefLoader,
    private taskRefLoader: TaskRefLoader,
  ) {}

  @ResolveField()
  async recipient(@Parent() entity: Assignment): Promise<Membership> {
    return this.membershipRefLoader.load(entity.recipient);
  }

  @ResolveField()
  async task(@Parent() entity: Assignment): Promise<Task> {
    return this.taskRefLoader.load(entity.task);
  }
}
