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
import { Role } from '../memberships/entities/role.enum';
import { MikroQuotaService } from '../mikro/mikro-quota/mikro-quota.service';
import { Repository } from '../mikro/repository.class';
import { Team } from '../teams/entities/team.entity';
import { AcceptMembershipRequestArgs } from './dto/accept-membership-request.args.dto';
import { AcceptMembershipRequestResult } from './dto/accept-membership-request-result.obj.dto';
import { CreateMembershipRequestArgs } from './dto/create-membership-request.args.dto';
import { DeleteMembershipRequestArgs } from './dto/delete-membership-request.args.dto';
import { PaginatedMembershipRequests } from './dto/paginated-membership-requests.obj.dto';
import { QueryMembershipRequestArgs } from './dto/query-membership-request.args.dto';
import { QueryMembershipRequestsArgs } from './dto/query-membership-requests.args.dto';
import { RejectMembershipRequestArgs } from './dto/reject-membership-request.args.dto';
import { MembershipRequest } from './entities/membership-request.entity';
import { MembershipRequestStatus } from './entities/membership-request-status.enum';

@Injectable()
export class MembershipRequestsService {
  constructor(
    @InjectRepository(MembershipRequest)
    private repo: Repository<MembershipRequest>,

    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,

    @InjectRepository(Team)
    private teamRepo: Repository<Team>,

    private quota: MikroQuotaService,
  ) {}

  async queryMany(
    { limit, offset, order, filter }: QueryMembershipRequestsArgs,
    query: FilterQuery<MembershipRequest> = {},
  ): Promise<PaginatedMembershipRequests> {
    return this.repo.findAndPaginate(
      {
        $and: [
          query,
          filter ? FilterMap.resolve<MembershipRequest>(filter) : {},
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

  async queryOne({
    id,
  }: QueryMembershipRequestArgs): Promise<MembershipRequest> {
    return this.repo.findOneOrFail(id, { filters: [CommonFilter.Crud] });
  }

  async createOne({
    data,
  }: CreateMembershipRequestArgs): Promise<MembershipRequest> {
    const user = Context.current.user;

    await this.teamRepo
      .findOne(data.team, {
        populate: ['memberships'],
        filters: false,
      })
      .then((team) => this.quota.check(team!, 'memberships'));

    await this.teamRepo
      .findOne({
        id: data.team,
        $or: [
          {
            membershipRequests: {
              owner: user,
              status: MembershipRequestStatus.Pending,
              deletedAt: null,
            },
          },
          {
            memberships: {
              owner: user,
              deletedAt: null,
            },
          },
        ],
      })
      .then((result) => {
        if (result)
          throw new BadRequestException(
            'team must be an ID of a team in which you have no membership or membershipRequest',
          );
      });

    return this.repo.create({
      owner: user,
      status: MembershipRequestStatus.Pending,
      ...data,
    });
  }

  async rejectOne({
    id,
  }: RejectMembershipRequestArgs): Promise<MembershipRequest> {
    const membershipRequest = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });

    this.forbidResulted(membershipRequest, 'reject');

    return membershipRequest.assign({
      status: MembershipRequestStatus.Rejected,
    });
  }

  async acceptOne({
    id,
  }: AcceptMembershipRequestArgs): Promise<AcceptMembershipRequestResult> {
    const membershipRequest = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });

    this.forbidResulted(membershipRequest, 'accept');

    membershipRequest.assign({
      status: MembershipRequestStatus.Accepted,
    });

    const membership = this.membershipRepo.create({
      owner: membershipRequest.owner,
      team: membershipRequest.team,
      role: Role.Member,
    });

    return { membershipRequest, membership };
  }

  async deleteOne({
    id,
  }: DeleteMembershipRequestArgs): Promise<MembershipRequest> {
    const membershipRequest = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });

    this.forbidResulted(membershipRequest, 'delete');

    return this.repo.delete(membershipRequest);
  }

  private forbidResulted(membershipRequest: MembershipRequest, action: string) {
    if (membershipRequest.status != MembershipRequestStatus.Pending)
      throw new ForbiddenException(
        `Cannot ${action} resulted membershipRequests`,
      );
  }
}
