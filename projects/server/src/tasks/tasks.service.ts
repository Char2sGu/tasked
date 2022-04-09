import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { CommonFilter } from '../common/common-filter.enum';
import { FilterMap } from '../common/dto/filter/filter-map.input.dto';
import { Context } from '../context/context.class';
import { Membership } from '../memberships/entities/membership.entity';
import { Repository } from '../mikro/repository.class';
import { CreateTaskArgs } from './dto/create-task.args.dto';
import { DeleteTaskArgs } from './dto/delete-task.args.dto';
import { PaginatedTasks } from './dto/paginated-tasks.obj.dto';
import { QueryTaskArgs } from './dto/query-task.args.dto';
import { QueryTasksArgs } from './dto/query-tasks.args.dto';
import { UpdateTaskArgs } from './dto/update-task.args.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private repo: Repository<Task>,
    @InjectRepository(Membership) private memRepo: Repository<Membership>,
  ) {}

  async queryMany(
    { limit, offset, order, filter, ownOnly }: QueryTasksArgs,
    query: FilterQuery<Task> = {},
  ): Promise<PaginatedTasks> {
    const user = Context.current.user;
    return this.repo.findAndPaginate(
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
    return this.repo.findOneOrFail(id, { filters: [CommonFilter.Crud] });
  }

  async createOne({ data }: CreateTaskArgs): Promise<Task> {
    const user = Context.current.user;

    const membership = await this.memRepo.findOneOrFail(
      { room: data.room, owner: user },
      {
        failHandler: () =>
          new BadRequestException(
            'room must be an ID of a room having your membership',
          ),
      },
    );

    return this.repo.create({
      creator: membership,
      isActive: true,
      ...data,
    });
  }

  async updateOne({ id, data }: UpdateTaskArgs): Promise<Task> {
    const task = await this.repo.findOneOrFail(id, {
      populate: ['creator'],
      filters: [CommonFilter.Crud],
    });

    const user = Context.current.user;
    if (task.creator.owner != user)
      throw new ForbiddenException('Cannot update tasks not created by you');

    return task.assign(data);
  }

  async deleteOne({ id }: DeleteTaskArgs): Promise<Task> {
    const task = await this.repo.findOneOrFail(id, {
      populate: ['creator'],
      filters: [CommonFilter.Crud],
    });

    const user = Context.current.user;
    if (task.creator.owner != user)
      throw new ForbiddenException('Cannot delete tasks not created by you');

    await this.repo.populate(task, ['assignments']);
    return this.repo.delete(task);
  }
}
