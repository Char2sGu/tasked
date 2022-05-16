import { FilterQuery } from '@mikro-orm/core';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { CommonFilter } from '../../common/common-filter.enum';
import { FilterMap } from '../../common/dto/filter/filter-map.input.dto';
import { Context } from '../../context/context.class';
import { QueryMembershipsArgs } from './dto/membership.args';
import { MembershipUpdateInput } from './dto/membership.inputs';
import { PaginatedMemberships } from './dto/memberships.objects';
import { Membership, MembershipRepository } from './entities/membership.entity';
import { Role } from './entities/role.enum';

@Injectable()
export class MembershipsService {
  constructor(private membershipRepo: MembershipRepository) {}

  async queryMany(
    { limit, offset, filter, order }: QueryMembershipsArgs,
    where: FilterQuery<Membership> = {},
  ): Promise<PaginatedMemberships> {
    return this.membershipRepo.findAndPaginate(
      { $and: [where, filter ? FilterMap.resolve<Membership>(filter) : {}] },
      { limit, offset, filters: [CommonFilter.Crud], orderBy: { ...order } },
    );
  }

  async queryOne(id: number): Promise<Membership> {
    return this.membershipRepo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });
  }

  async updateOne(
    id: number,
    data: MembershipUpdateInput,
  ): Promise<Membership> {
    const [target] = await this.canWrite(id, 'update');
    return target.assign(data);
  }

  async deleteOne(id: number): Promise<Membership> {
    const [target] = await this.canWrite(id, 'delete');
    await this.membershipRepo.populate(target, ['assignments']);
    return this.membershipRepo.delete(target);
  }

  private async canWrite(where: FilterQuery<Membership>, action: string) {
    const targetMembership = await this.membershipRepo.findOneOrFail(where, {
      filters: [CommonFilter.Crud],
    });
    const ownMembership = await this.membershipRepo.findOneOrFail({
      owner: Context.current.user,
      team: targetMembership.team,
    });
    const team = await ownMembership.team.init();

    if (ownMembership.owner === team.creator) {
      if (ownMembership === targetMembership)
        throw new ForbiddenException(
          `Cannot ${action} the membership of the creator`,
        );
    } else if (ownMembership.role === Role.Manager) {
      if (ownMembership !== targetMembership)
        if (targetMembership.role !== Role.Member)
          throw new ForbiddenException(
            `Cannot ${action} memberships of managers`,
          );
    } else if (ownMembership.role === Role.Member) {
      if (ownMembership !== targetMembership)
        throw new ForbiddenException(
          `Cannot ${action} memberships as a member`,
        );
    }

    return [targetMembership, ownMembership];
  }
}
