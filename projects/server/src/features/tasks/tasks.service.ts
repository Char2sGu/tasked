import { FilterQuery } from '@mikro-orm/core';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { CommonFilter } from '../../common/common-filter.enum';
import { FilterMap } from '../../common/dto/filter/filter-map.input.dto';
import { Context } from '../../context/context.class';
import { MembershipRepository } from '../memberships/entities/membership.entity';
import { CreateTaskArgs } from './dto/create-task.args.dto';
import { DeleteTaskArgs } from './dto/delete-task.args.dto';
import { PaginatedTasks } from './dto/paginated-tasks.obj.dto';
import { QueryTaskArgs } from './dto/query-task.args.dto';
import { QueryTasksArgs } from './dto/query-tasks.args.dto';
import { UpdateTaskArgs } from './dto/update-task.args.dto';
import { Task, TaskRepository } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    private taskRepo: TaskRepository,
    private membershipRepo: MembershipRepository,
  ) {}

  async queryMany(
    { limit, offset, order, filter, ownOnly }: QueryTasksArgs,
    query: FilterQuery<Task> = {},
  ): Promise<PaginatedTasks> {
    const user = Context.current.user;
    return this.taskRepo.findAndPaginate(
      {
        $and: [
          query,
          filter ? FilterMap.resolve<Task>(filter) : {},
          ownOnly ? { creator: { owner: user } } : {},
        ],
      },
      {
        limit,
        offset,
        orderBy: { ...order },
        filters: [CommonFilter.Crud],
      },
    );
  }

  async queryOne({ id }: QueryTaskArgs): Promise<Task> {
    return this.taskRepo.findOneOrFail(id, { filters: [CommonFilter.Crud] });
  }

  async createOne({ data }: CreateTaskArgs): Promise<Task> {
    const user = Context.current.user;

    const membership = await this.membershipRepo.findOneOrFail(
      { team: data.team, owner: user },
      {
        failHandler: () =>
          new BadRequestException(
            'team must be an ID of a team having your membership',
          ),
      },
    );

    return this.taskRepo.create({
      creator: membership,
      isActive: true,
      ...data,
    });
  }

  async updateOne({ id, data }: UpdateTaskArgs): Promise<Task> {
    const task = await this.taskRepo.findOneOrFail(id, {
      populate: ['creator'],
      filters: [CommonFilter.Crud],
    });

    const user = Context.current.user;
    if (task.creator.owner != user)
      throw new ForbiddenException('Cannot update tasks not created by you');

    return task.assign(data);
  }

  async deleteOne({ id }: DeleteTaskArgs): Promise<Task> {
    const task = await this.taskRepo.findOneOrFail(id, {
      populate: ['creator'],
      filters: [CommonFilter.Crud],
    });

    const user = Context.current.user;
    if (task.creator.owner !== user)
      throw new ForbiddenException('Cannot delete tasks not created by you');

    await this.taskRepo.populate(task, ['assignments']);
    return this.taskRepo.delete(task);
  }
}
