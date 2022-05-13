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
  async creator(@Parent() entity: Task): Promise<Membership> {
    return this.membershipRefLoader.load(entity.creator);
  }

  @ResolveField()
  async assignments(
    @Args() args: QueryAssignmentsArgs,
    @Parent() entity: Task,
  ): Promise<PaginatedAssignments> {
    return this.assignmentsService.queryMany(args, { task: entity });
  }
}
