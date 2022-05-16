import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ReqUser } from '../../common/req-user.decorator';
import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
import { QueryMembershipInvitationsArgs } from '../membership-invitations/dto/membership-invitation.args';
import { MembershipInvitationPage } from '../membership-invitations/dto/membership-invitation.objects';
import { MembershipInvitationsService } from '../membership-invitations/membership-invitations.service';
import { PaginatedTasks } from '../tasks/dto/paginated-tasks.obj.dto';
import { QueryTasksArgs } from '../tasks/dto/query-tasks.args.dto';
import { TasksService } from '../tasks/tasks.service';
import { Team } from '../teams/entities/team.entity';
import { TeamRefLoader } from '../teams/team-ref.loader';
import { User } from '../users/entities/user.entity';
import { UserRefLoader } from '../users/user-ref.loader';
import { Membership } from './entities/membership.entity';

@Resolver(() => Membership)
export class MembershipsFieldsResolver {
  constructor(
    private userRefLoader: UserRefLoader,
    private teamRefLoader: TeamRefLoader,
    private tasksService: TasksService,
    private assignmentsService: AssignmentsService,
    private membershipInvitationsService: MembershipInvitationsService,
  ) {}

  @ResolveField()
  async owner(@Parent() parent: Membership): Promise<User> {
    return this.userRefLoader.load(parent.owner);
  }

  @ResolveField()
  async team(@Parent() parent: Membership): Promise<Team> {
    return this.teamRefLoader.load(parent.team);
  }

  @ResolveField()
  async assignments(
    @Parent() parent: Membership,
    @Args() args: QueryAssignmentsArgs,
  ): Promise<PaginatedAssignments> {
    return this.assignmentsService.queryMany(args, { recipient: parent });
  }

  @ResolveField()
  async invitationsSent(
    @ReqUser() user: User,
    @Parent() parent: Membership,
    @Args() args: QueryMembershipInvitationsArgs,
  ): Promise<MembershipInvitationPage> {
    return this.membershipInvitationsService.queryMany(user, args, {
      inviter: parent,
    });
  }

  @ResolveField()
  async tasks(
    @Parent() parent: Membership,
    @Args() args: QueryTasksArgs,
  ): Promise<PaginatedTasks> {
    return this.tasksService.queryMany(args, { creator: parent });
  }
}
