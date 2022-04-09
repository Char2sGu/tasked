import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { MembershipRefLoader } from '../memberships/membership-ref.loader';
import { TaskRefLoader } from '../tasks/task-ref.loader';
import { Assignment } from './entities/assignment.entity';

@Resolver(() => Assignment)
export class AssignmentsFieldsResolver {
  constructor(
    private membershipRefLoader: MembershipRefLoader,
    private taskRefLoader: TaskRefLoader,
  ) {}

  @ResolveField()
  async recipient(@Parent() entity: Assignment) {
    return this.membershipRefLoader.load(entity.recipient);
  }

  @ResolveField()
  async task(@Parent() entity: Assignment) {
    return this.taskRefLoader.load(entity.task);
  }
}
