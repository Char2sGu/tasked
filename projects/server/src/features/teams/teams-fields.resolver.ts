import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
import { PaginatedMembershipRequests } from '../membership-requests/dto/paginated-membership-requests.obj.dto';
import { QueryMembershipRequestsArgs } from '../membership-requests/dto/query-membership-requests.args.dto';
import { MembershipRequestsService } from '../membership-requests/membership-requests.service';
import { QueryMembershipsArgs } from '../memberships/dto/membership.args';
import { PaginatedMemberships } from '../memberships/dto/memberships.objects';
import { Membership } from '../memberships/entities/membership.entity';
import { MembershipsService } from '../memberships/memberships.service';
import { PaginatedTasks } from '../tasks/dto/paginated-tasks.obj.dto';
import { QueryTasksArgs } from '../tasks/dto/query-tasks.args.dto';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import { UserRefLoader } from '../users/user-ref.loader';
import { Team } from './entities/team.entity';
import { TeamMembershipLoader } from './team-membership.loader';

@Resolver(() => Team)
export class TeamsFieldsResolver {
  constructor(
    private userRefLoader: UserRefLoader,
    private teamMembershipLoader: TeamMembershipLoader,
    private membershipRequestsService: MembershipRequestsService,
    private membershipsService: MembershipsService,
    private tasksService: TasksService,
    private assignmentsService: AssignmentsService,
  ) {}

  @ResolveField()
  async creator(@Parent() entity: Team): Promise<User> {
    return this.userRefLoader.load(entity.creator);
  }

  @ResolveField(() => PaginatedMembershipRequests)
  async membershipRequests(
    @Args() args: QueryMembershipRequestsArgs,
    @Parent() entity: Team,
  ): Promise<PaginatedMembershipRequests> {
    return this.membershipRequestsService.queryMany(args, {
      team: entity,
    });
  }

  @ResolveField()
  async memberships(
    @Args() args: QueryMembershipsArgs,
    @Parent() entity: Team,
  ): Promise<PaginatedMemberships> {
    return this.membershipsService.queryMany(args, { team: entity });
  }

  @ResolveField(() => Membership, { nullable: true })
  async membership(@Parent() entity: Team): Promise<Membership | undefined> {
    return this.teamMembershipLoader.load(entity);
  }

  @ResolveField(() => PaginatedTasks)
  async tasks(
    @Args() args: QueryTasksArgs,
    @Parent() entity: Team,
  ): Promise<PaginatedTasks> {
    return this.tasksService.queryMany(args, { creator: { team: entity } });
  }

  @ResolveField(() => PaginatedAssignments)
  async assignments(
    @Args() args: QueryAssignmentsArgs,
    @Parent() entity: Team,
  ): Promise<PaginatedAssignments> {
    return this.assignmentsService.queryMany(args, {
      task: { creator: { team: entity } },
    });
  }
}
