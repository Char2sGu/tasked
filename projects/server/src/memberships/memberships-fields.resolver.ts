import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AssignmentsService } from '../assignments/assignments.service';
import { PaginatedAssignments } from '../assignments/dto/paginated-assignments.obj.dto';
import { QueryAssignmentsArgs } from '../assignments/dto/query-assignments.args.dto';
import { Room } from '../rooms/entities/room.entity';
import { RoomRefLoader } from '../rooms/room-ref.loader';
import { PaginatedTasks } from '../tasks/dto/paginated-tasks.obj.dto';
import { QueryTasksArgs } from '../tasks/dto/query-tasks.args.dto';
import { TasksService } from '../tasks/tasks.service';
import { User } from '../users/entities/user.entity';
import { UserRefLoader } from '../users/user-ref.loader';
import { Membership } from './entities/membership.entity';

@Resolver(() => Membership)
export class MembershipsFieldsResolver {
  constructor(
    private userRefLoader: UserRefLoader,
    private roomRefLoader: RoomRefLoader,
    private assignmentsService: AssignmentsService,
    private tasksService: TasksService,
  ) {}

  @ResolveField()
  async owner(@Parent() entity: Membership): Promise<User> {
    return this.userRefLoader.load(entity.owner);
  }

  @ResolveField()
  async room(@Parent() entity: Membership): Promise<Room> {
    return this.roomRefLoader.load(entity.room);
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
