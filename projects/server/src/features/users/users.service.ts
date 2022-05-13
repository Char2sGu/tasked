import { InjectRepository } from '@mikro-orm/nestjs';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { CommonFilter } from '../../common/common-filter.enum';
import { FilterMap } from '../../common/dto/filter/filter-map.input.dto';
import { Context } from '../../context/context.class';
import { Repository } from '../../mikro/repository.class';
import {
  CreateUserArgs,
  QueryUserArgs,
  QueryUsersArgs,
  UpdateUserArgs,
} from './dto/user.args';
import { PaginatedUsers } from './dto/user.objects';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async queryMany({
    limit,
    offset,
    order,
    filter,
  }: QueryUsersArgs): Promise<PaginatedUsers> {
    return this.repo.findAndPaginate(
      filter ? FilterMap.resolve<User>(filter) : {},
      {
        limit,
        offset,
        filters: [CommonFilter.Crud],
        orderBy: { ...order },
      },
    );
  }

  async queryOne({ id }: QueryUserArgs): Promise<User> {
    return this.repo.findOneOrFail(id, { filters: [CommonFilter.Crud] });
  }

  /**@deprecated */
  async createOne({ data }: CreateUserArgs): Promise<User> {
    return this.repo.create(data);
  }

  async updateOne({ id, data }: UpdateUserArgs): Promise<User> {
    const entity = await this.repo.findOneOrFail(id);

    const user = Context.current.user;
    if (entity != user)
      throw new ForbiddenException('Cannot update other users');

    return entity.assign(data);
  }
}
