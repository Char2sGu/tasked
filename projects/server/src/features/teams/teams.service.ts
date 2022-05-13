import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { CommonFilter } from '../../common/common-filter.enum';
import { FilterMap } from '../../common/dto/filter/filter-map.input.dto';
import { Context } from '../../context/context.class';
import { MikroQuotaService } from '../../mikro/mikro-quota/mikro-quota.service';
import { Repository } from '../../mikro/repository.class';
import { Role } from '../memberships/entities/role.enum';
import { CreateTeamArgs } from './dto/create-team.args.dto';
import { DeleteTeamArgs } from './dto/delete-team.args.dto';
import { PaginatedTeams } from './dto/paginated-teams.obj.dto';
import { QueryTeamArgs } from './dto/query-team.args.dto';
import { QueryTeamsArgs } from './dto/query-teams.args.dto';
import { UpdateTeamArgs } from './dto/update-team.args.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    private em: EntityManager,
    @InjectRepository(Team) private repo: Repository<Team>,
    private quota: MikroQuotaService,
  ) {}

  async queryMany(
    { limit, offset, order, filter, joinedOnly }: QueryTeamsArgs,
    query: FilterQuery<Team> = {},
  ): Promise<PaginatedTeams> {
    const user = Context.current.user;
    return this.repo.findAndPaginate(
      {
        $and: [
          query,
          filter ? FilterMap.resolve<Team>(filter) : {},
          joinedOnly
            ? {
                memberships: {
                  owner: user,
                  deletedAt: null,
                },
              }
            : {},
        ],
      },
      {
        limit,
        offset,
        filters: [CommonFilter.Crud],
        orderBy: { ...order },
      },
    );
  }

  async queryOne({ id }: QueryTeamArgs): Promise<Team> {
    return this.repo.findOneOrFail(id, { filters: [CommonFilter.Crud] });
  }

  async createOne({ data }: CreateTeamArgs): Promise<Team> {
    const user = Context.current.user;
    await this.em.populate(user, ['teams']);
    await this.quota.check(user, 'teams');
    return this.repo.create({
      creator: user,
      memberships: [{ owner: user, role: Role.Manager }],
      isOpen: true,
      ...data,
    });
  }

  async updateOne({ id, data }: UpdateTeamArgs): Promise<Team> {
    const team = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });

    const user = Context.current.user;
    if (user != team.creator)
      throw new ForbiddenException('Cannot update teams not created by you');

    return team.assign(data);
  }

  async deleteOne({ id }: DeleteTeamArgs): Promise<Team> {
    const team = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });

    const user = Context.current.user;
    if (user != team.creator)
      throw new ForbiddenException('Cannot delete teams not created by you');

    await this.repo.populate(team, [
      'membershipRequests',
      'memberships',
      'memberships.assignments',
      'memberships.tasks',
    ]);

    return this.repo.delete(team);
  }
}
