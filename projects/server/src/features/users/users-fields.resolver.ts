import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ReqUser } from '../../common/req-user.decorator';
import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
import { QueryMembershipInvitationsArgs } from '../membership-invitations/dto/membership-invitation.args';
import { MembershipInvitationPage } from '../membership-invitations/dto/membership-invitation.objects';
import { MembershipInvitationsService } from '../membership-invitations/membership-invitations.service';
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
    private membershipsService: MembershipsService,
    private membershipRequestsService: MembershipRequestsService,
    private membershipInvitationsService: MembershipInvitationsService,
    private tasksService: TasksService,
    private assignmentsService: AssignmentsService,
  ) {}

  @ResolveField()
  async teams(
    @Parent() parent: User,
    @Args() args: QueryTeamsArgs,
  ): Promise<PaginatedTeams> {
    return this.teamsService.queryMany(args, { creator: parent });
  }

  @ResolveField()
  async membershipRequests(
    @Parent() parent: User,
    @Args() args: QueryMembershipRequestsArgs,
  ): Promise<PaginatedMembershipRequests> {
    return this.membershipRequestsService.queryMany(args, { owner: parent });
  }

  @ResolveField()
  async memberships(
    @Parent() parent: User,
    @Args() args: QueryMembershipsArgs,
  ): Promise<PaginatedMemberships> {
    return this.membershipsService.queryMany(args, { owner: parent });
  }

  @ResolveField()
  async invitationsReceived(
    @ReqUser() user: User,
    @Parent() parent: User,
    @Args() args: QueryMembershipInvitationsArgs,
  ): Promise<MembershipInvitationPage> {
    return this.membershipInvitationsService.queryMany(user, args, {
      target: parent,
    });
  }

  @ResolveField(() => PaginatedTasks)
  async tasks(
    @Parent() parent: User,
    @Args() args: QueryTasksArgs,
  ): Promise<PaginatedTasks> {
    return this.tasksService.queryMany(args, { creator: { owner: parent } });
  }

  @ResolveField(() => PaginatedAssignments)
  async assignments(
    @Parent() parent: User,
    @Args() args: QueryAssignmentsArgs,
  ): Promise<PaginatedAssignments> {
    return this.assignmentsService.queryMany(args, {
      recipient: { owner: parent },
    });
  }
}
