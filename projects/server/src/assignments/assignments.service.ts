import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { isDefined } from 'class-validator';

import { CommonFilter } from '../common/common-filter.enum';
import { FilterMap } from '../common/dto/filter/filter-map.input.dto';
import { Context } from '../context/context.class';
import { Membership } from '../memberships/entities/membership.entity';
import { Role } from '../memberships/entities/role.enum';
import { Repository } from '../mikro/repository.class';
import { Task } from '../tasks/entities/task.entity';
import { CreateAssignmentArgs } from './dto/create-assignment.args.dto';
import { DeleteAssignmentArgs } from './dto/delete-assignment.args.dto';
import { PaginatedAssignments } from './dto/paginated-assignments.obj.dto';
import { QueryAssignmentArgs } from './dto/query-assignment.args.dto';
import { QueryAssignmentsArgs } from './dto/query-assignments.args.dto';
import { UpdateAssignmentArgs } from './dto/update-assignment.args.dto';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private repo: Repository<Assignment>,

    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,

    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async queryMany(
    { limit, offset, order, filter, ownOnly }: QueryAssignmentsArgs,
    query: FilterQuery<Assignment> = {},
  ): Promise<PaginatedAssignments> {
    const user = Context.current.user;
    return this.repo.findAndPaginate(
      {
        $and: [
          query,
          filter ? FilterMap.resolve<Assignment>(filter) : {},
          ownOnly ? { recipient: { owner: user } } : {},
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

  async queryOne({ id }: QueryAssignmentArgs): Promise<Assignment> {
    return this.repo.findOneOrFail(id, { filters: [CommonFilter.Crud] });
  }

  async createOne({ data }: CreateAssignmentArgs): Promise<Assignment> {
    const user = Context.current.user;

    await this.membershipRepo
      .findOneOrFail(data.recipient, { filters: false })
      .then((membership) => {
        if (membership.role != Role.Member)
          throw new BadRequestException(
            'recipient must be an ID of a member membership in this room',
          );
      });

    await this.taskRepo
      .findOneOrFail(data.task, { filters: false, populate: ['creator'] })
      .then((task) => {
        if (task.creator.owner != user)
          throw new BadRequestException(
            'task must be an ID of a task created by you',
          );
      });

    return this.repo.create({
      isCompleted: false,
      isImportant: false,
      ...data,
    });
  }

  async updateOne({ id, data }: UpdateAssignmentArgs): Promise<Assignment> {
    const assignment = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
      populate: ['task', 'recipient'],
    });

    const user = Context.current.user;
    if (user != assignment.recipient.owner) {
      if (isDefined(data.isCompleted))
        throw new ForbiddenException(
          'Cannot update completeness of assignments not assigned to you',
        );
      if (isDefined(data.isImportant))
        throw new ForbiddenException(
          'Cannot update importance of assignments not assigned to you',
        );
    }

    return assignment.assign(data);
  }

  async deleteOne({ id }: DeleteAssignmentArgs): Promise<Assignment> {
    const assignment = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
      populate: ['task.creator'],
    });

    const user = Context.current.user;
    if (user != assignment.task.creator.owner)
      throw new ForbiddenException(
        'Cannot delete assignments not created by you',
      );

    return this.repo.delete(assignment);
  }
}
