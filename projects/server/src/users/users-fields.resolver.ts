import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ApplicationsService } from '../applications/applications.service';
import { PaginatedApplications } from '../applications/dto/paginated-applications.obj.dto';
import { QueryApplicationsArgs } from '../applications/dto/query-applications.args.dto';
import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
import { PaginatedMemberships } from '../memberships/dto/paginated-memberships.obj.dto';
import { QueryMembershipsArgs } from '../memberships/dto/query-memberships.args.dto';
import { MembershipsService } from '../memberships/memberships.service';
import { PaginatedRooms } from '../rooms/dto/paginated-rooms.obj.dto';
import { QueryRoomsArgs } from '../rooms/dto/query-rooms.args.dto';
import { RoomsService } from '../rooms/rooms.service';
import { PaginatedTasks } from '../tasks/dto/paginated-tasks.obj.dto';
import { QueryTasksArgs } from '../tasks/dto/query-tasks.args.dto';
import { TasksService } from '../tasks/tasks.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersFieldsResolver {
  constructor(
    private roomsService: RoomsService,
    private applicationsService: ApplicationsService,
    private membershipsService: MembershipsService,
    private tasksService: TasksService,
    private assignmentsService: AssignmentsService,
  ) {}

  @ResolveField()
  async rooms(
    @Args() args: QueryRoomsArgs,
    @Parent() entity: User,
  ): Promise<PaginatedRooms> {
    return this.roomsService.queryMany(args, { creator: entity });
  }

  @ResolveField()
  async applications(
    @Args() args: QueryApplicationsArgs,
    @Parent() entity: User,
  ): Promise<PaginatedApplications> {
    return this.applicationsService.queryMany(args, { owner: entity });
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
