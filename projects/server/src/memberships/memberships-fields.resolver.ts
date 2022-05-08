import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
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
    private assignmentsService: AssignmentsService,
    private tasksService: TasksService,
  ) {}

  @ResolveField()
  async owner(@Parent() entity: Membership): Promise<User> {
    return this.userRefLoader.load(entity.owner);
  }

  @ResolveField()
  async team(@Parent() entity: Membership): Promise<Team> {
    return this.teamRefLoader.load(entity.team);
  }

  @ResolveField()
  async assignments(
    @Args() args: QueryAssignmentsArgs,
    @Parent() entity: Membership,
  ): Promise<PaginatedAssignments> {
    return this.assignmentsService.queryMany(args, { recipient: entity });
  }

  @ResolveField()
  async tasks(
    @Args() args: QueryTasksArgs,
    @Parent() entity: Membership,
  ): Promise<PaginatedTasks> {
    return this.tasksService.queryMany(args, { creator: entity });
  }
}
