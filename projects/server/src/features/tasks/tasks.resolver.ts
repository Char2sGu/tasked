import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTaskArgs } from './dto/create-task.args.dto';
import { DeleteTaskArgs } from './dto/delete-task.args.dto';
import { PaginatedTasks } from './dto/paginated-tasks.obj.dto';
import { QueryTaskArgs } from './dto/query-task.args.dto';
import { QueryTasksArgs } from './dto/query-tasks.args.dto';
import { UpdateTaskArgs } from './dto/update-task.args.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private service: TasksService) {}

  @Query(() => PaginatedTasks)
  async tasks(@Args() args: QueryTasksArgs): Promise<PaginatedTasks> {
    return this.service.queryMany(args);
  }

  @Query(() => Task)
  async task(@Args() args: QueryTaskArgs): Promise<Task> {
    return this.service.queryOne(args);
  }

  @Mutation(() => Task)
  async createTask(@Args() args: CreateTaskArgs): Promise<Task> {
    return this.service.createOne(args);
  }

  @Mutation(() => Task)
  async updateTask(@Args() args: UpdateTaskArgs): Promise<Task> {
    return this.service.updateOne(args);
  }

  @Mutation(() => Task)
  async deleteTask(@Args() args: DeleteTaskArgs): Promise<Task> {
    return this.service.deleteOne(args);
  }
}
