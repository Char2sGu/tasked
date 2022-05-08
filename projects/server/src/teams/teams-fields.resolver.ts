import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ApplicationsService } from '../applications/applications.service';
import { PaginatedApplications } from '../applications/dto/paginated-applications.obj.dto';
import { QueryApplicationsArgs } from '../applications/dto/query-applications.args.dto';
import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
import { PaginatedMemberships } from '../memberships/dto/paginated-memberships.obj.dto';
import { QueryMembershipsArgs } from '../memberships/dto/query-memberships.args.dto';
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
    private applicationsService: ApplicationsService,
    private membershipsService: MembershipsService,
    private tasksService: TasksService,
    private assignmentsService: AssignmentsService,
  ) {}

  @ResolveField()
  async creator(@Parent() entity: Team): Promise<User> {
    return this.userRefLoader.load(entity.creator);
  }

  @ResolveField(() => PaginatedApplications)
  async applications(
    @Args() args: QueryApplicationsArgs,
    @Parent() entity: Team,
  ): Promise<PaginatedApplications> {
    return this.applicationsService.queryMany(args, {
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
