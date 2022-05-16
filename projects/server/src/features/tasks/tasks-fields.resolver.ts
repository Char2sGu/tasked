import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
import { Membership } from '../memberships/entities/membership.entity';
import { MembershipRefLoader } from '../memberships/membership-ref.loader';
import { Task } from './entities/task.entity';

@Resolver(() => Task)
export class TasksFieldsResolver {
  constructor(
    private membershipRefLoader: MembershipRefLoader,
    private assignmentsService: AssignmentsService,
  ) {}

  @ResolveField()
  async creator(@Parent() parent: Task): Promise<Membership> {
    return this.membershipRefLoader.load(parent.creator);
  }

  @ResolveField()
  async assignments(
    @Parent() parent: Task,
    @Args() args: QueryAssignmentsArgs,
  ): Promise<PaginatedAssignments> {
    return this.assignmentsService.queryMany(args, { task: parent });
  }

  @ResolveField(() => Boolean)
  async isCompleted(@Parent() parent: Task): Promise<boolean> {
    return parent.assignments
      .matching({ where: { isCompleted: false } })
      .then((uncompleted) => !uncompleted.length);
  }
}
