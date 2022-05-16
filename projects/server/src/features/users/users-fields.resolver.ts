import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
import { PaginatedMembershipRequests } from '../membership-requests/dto/paginated-membership-requests.obj.dto';
import { QueryMembershipRequestsArgs } from '../membership-requests/dto/query-membership-requests.args.dto';
import { MembershipRequestsService } from '../membership-requests/membership-requests.service';
import { QueryMembershipsArgs } from '../memberships/dto/membership.args';
import { PaginatedMemberships } from '../memberships/dto/memberships.objects';
import { MembershipsService } from '../memberships/memberships.service';
import { PaginatedTasks } from '../tasks/dto/paginated-tasks.obj.dto';
import { QueryTasksArgs } from '../tasks/dto/query-tasks.args.dto';
import { TasksService } from '../tasks/tasks.service';
import { PaginatedTeams } from '../teams/dto/paginated-teams.obj.dto';
import { QueryTeamsArgs } from '../teams/dto/query-teams.args.dto';
import { TeamsService } from '../teams/teams.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersFieldsResolver {
  constructor(
    private teamsService: TeamsService,
    private membershipRequestsService: MembershipRequestsService,
    private membershipsService: MembershipsService,
    private tasksService: TasksService,
    private assignmentsService: AssignmentsService,
  ) {}

  @ResolveField()
  async teams(
    @Args() args: QueryTeamsArgs,
    @Parent() entity: User,
  ): Promise<PaginatedTeams> {
    return this.teamsService.queryMany(args, { creator: entity });
  }

  @ResolveField()
  async membershipRequests(
    @Args() args: QueryMembershipRequestsArgs,
    @Parent() entity: User,
  ): Promise<PaginatedMembershipRequests> {
    return this.membershipRequestsService.queryMany(args, { owner: entity });
  }

  @ResolveField()
  async memberships(
    @Args() args: QueryMembershipsArgs,
    @Parent() entity: User,
  ): Promise<PaginatedMemberships> {
    return this.membershipsService.queryMany(args, { owner: entity });
  }

  @ResolveField(() => PaginatedTasks)
  async tasks(
    @Args() args: QueryTasksArgs,
    @Parent() entity: User,
  ): Promise<PaginatedTasks> {
    return this.tasksService.queryMany(args, { creator: { owner: entity } });
  }

  @ResolveField(() => PaginatedAssignments)
  async assignments(
    @Args() args: QueryAssignmentsArgs,
    @Parent() entity: User,
  ): Promise<PaginatedAssignments> {
    return this.assignmentsService.queryMany(args, {
      recipient: { owner: entity },
    });
  }
}
